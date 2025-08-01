"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import Button from "../base/Button";
import Input from "../base/Input";

import OsSelector from "../OsSelector";
import { genScript, SUPPORTED_OS } from "../../service/browserScriptGen";
import { download } from "../../service/downloadToBrowserService";

export default function MainDisplay() {
  const [targetOs, setTargetOs] = useState<SUPPORTED_OS>("win");
  const [name, setName] = useState("");
  const scriptAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const updateContent = (data: { content: LS_Deployable }) => {
      if (data.content.name) {
        setName(data.content.name);
      }
    };

    emitter.on(eventKeys.updateDeployable, updateContent);

    return () => {
      emitter.off(eventKeys.updateDeployable, updateContent);
    };
  }, []);

  async function createExecutable() {
    //TODO check name and script before proceeding

    const area = scriptAreaRef.current;
    if (!area) return;

    const tc = area.textLength;
    const v = area.value;
    const args = area.value.split("\n");
    console.log({ tc, v, args });

    const ret = genScript(
      targetOs,
      name,
      args.map((a) => a.trim())
    );

    const res = download(ret.script, ret.name);

    console.log(res);

    // const lazyLocalStorage = await import("../../service/localStorageService");

    // lazyLocalStorage.default.save("last", {
    //   name: sanitizedName,
    //   os: targetOs,
    //   timestamp: Date.now(),
    //   processes: sanitizedProcesses,
    // });

    // emitter.emit(eventKeys.updateSideBar);
  }

  // async function handleSaveClick() {
  //   const sanitizedName = name.trim() === "" ? undefined : name.trim();
  //   const sanitizedProcesses = processes.filter((p) => p.arg.trim() !== "");

  //   if (!sanitizedProcesses || !sanitizedName) {
  //     return;
  //   }

  //   const lazyLocalStorage = await import("../../service/localStorageService");
  //   lazyLocalStorage.default.save("saved", {
  //     name: sanitizedName,
  //     os: targetOs,
  //     timestamp: Date.now(),
  //     processes: sanitizedProcesses,
  //   });
  //   emitter.emit(eventKeys.updateSideBar);
  // }

  return (
    <>
      <div className="h-full flex flex-col justify-between gap-2">
        <div className="flex flex-col gap-6 overflow-y-auto h-[80%]">
          {/* TODO */}
          <Button onClick={() => {}}>
            <span className="flex items-center gap-2">
              <span className="text-[var(--color-accent)] text-3xl">+</span> New
            </span>
          </Button>
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
          <div className="w-[35rem] h-full bg-[var(--color-tertiary)] p-4 rounded-lg">
          
              <textarea
                ref={scriptAreaRef}
                className="resize-none text-black h-full w-full rounded-lg border border-black"
              />
          
          </div>
        </div>
        <div className="flex flex-col gap-10 h-[20%]">
          <Button
            className="text-xl"
            // onClick={handleSaveClick}
          >
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
