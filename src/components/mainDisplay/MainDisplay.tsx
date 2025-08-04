"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import Button from "../base/Button";
import Input from "../base/Input";

import OsSelector from "../OsSelector";
import {
  ArgType,
  genScript,
  RawProc,
  SUPPORTED_OS,
} from "../../service/browserScriptGen";
import { download } from "../../service/downloadToBrowserService";
import ProcessLine from "./ProcessLine";

export default function MainDisplay() {
  const [targetOs, setTargetOs] = useState<SUPPORTED_OS>("win");
  const [name, setName] = useState("");
  const [scriptArgs, setScriptArgs] = useState<RawProc[]>([
    {
      type: "u",
      arg: "",
    },
  ]);

  useEffect(() => {
    const updateContent = (data: { content: LS_Deployable }) => {
      if (data.content.name) {
        setName(data.content.name);
      }
      setScriptArgs(data.content.processes);
    };

    emitter.on(eventKeys.updateDeployable, updateContent);

    return () => {
      emitter.off(eventKeys.updateDeployable, updateContent);
    };
  }, []);

  async function createExecutable() {
    console.log({ scriptArgs });

    //TODO check name and script before proceeding

    if (!name) return;

    const ret = genScript(targetOs, name, scriptArgs);

    const res = download(ret.script, ret.name);
    console.log({ res });

    if (res) {
      const lazyLocalStorage = await import(
        "../../service/localStorageService"
      );
      lazyLocalStorage.default.save("last", {
        name: name.trim(),
        os: targetOs,
        timestamp: Date.now(),
        processes: scriptArgs,
      });
      emitter.emit(eventKeys.updateSideBar);
    }
  }

  function clearScript() {
    setScriptArgs([]);
    setName("");
  }

  async function handleSaveClick() {
    const sanitizedName = name.trim() === "" ? undefined : name.trim();
    const sanitizedProcesses = scriptArgs.filter((p) => p.arg.trim() !== "");

    if (!sanitizedProcesses || !sanitizedName) {
      return;
    }

    const lazyLocalStorage = await import("../../service/localStorageService");
    lazyLocalStorage.default.save("saved", {
      name: sanitizedName,
      os: targetOs,
      timestamp: Date.now(),
      processes: sanitizedProcesses,
    });
    emitter.emit(eventKeys.updateSideBar);
  }

  return (
    <>
      <div className="h-full flex flex-col justify-between gap-2">
        <div className="flex flex-col gap-6 overflow-y-auto h-[80%]">
          <div className="flex gap-5 w-full">
            <Button onClick={clearScript}>
              <span className="flex items-center gap-2">
                <span className="text-[var(--color-accent)] text-3xl">+</span>{" "}
                New
              </span>
            </Button>{" "}
            <Button
              onClick={() => {
                setScriptArgs((prev) => [...prev, { arg: "", type: "u" }]);
              }}
            >
              <span className="flex items-center gap-2">
                <span className="text-[var(--color-accent)] text-3xl">+</span>{" "}
                Add
              </span>
            </Button>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <label>Name</label>
            <Input
              className="ml-2"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          {scriptArgs.map((sa, i) => (
            <ProcessLine
              key={i}
              proc={sa}
              index={i}
              removeProcessAction={() => {
                setScriptArgs((prev) => prev.filter((_, index) => index !== i));
              }}
              handleSelectChange={(newVal: string): void => {
                setScriptArgs((prev) => {
                  const copy = [...prev];
                  copy[i].type = newVal as ArgType;
                  return copy;
                });
              }}
              handleInputChange={(newArg: string): void => {
                setScriptArgs((prev) => {
                  const copy = [...prev];
                  copy[i].arg = newArg;
                  return copy;
                });
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-10 h-[20%]">
          <Button className="text-xl" onClick={handleSaveClick}>
            Save
          </Button>
          <div className="flex gap-4">
            <OsSelector
              updateTarget={(s) => setTargetOs(s as SUPPORTED_OS)}
              supportedOs={SUPPORTED_OS}
            />

            <Button
              className="text-xl disabled:text-gray-500 disabled:cursor-not-allowed"
              onClick={createExecutable}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
