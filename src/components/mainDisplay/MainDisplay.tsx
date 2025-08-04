"use client";

import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import Button from "../base/Button";
import Input from "../base/Input";

import { ArgType, RawProc } from "../../service/browserScriptGen";
import ProcessLine from "./ProcessLine";

type MainDisplayProps = {
  setName: Dispatch<SetStateAction<string>>;
  setScriptArgs: Dispatch<SetStateAction<RawProc[]>>;
  scriptArgs: RawProc[];
  name: string;
};

export default function MainDisplay(props: MainDisplayProps) {
  const { setName, setScriptArgs, scriptArgs, name } = props;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearScript() {
    setScriptArgs([]);
    setName("");
  }

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex flex-col gap-6 overflow-y-hidden ">
        <div className="flex gap-5 w-full">
          <Button onClick={clearScript}>
            <span className="flex items-center gap-2">
              <span className="text-[var(--color-accent)] text-3xl">+</span> New
            </span>
          </Button>
          <Button
            onClick={() => {
              setScriptArgs((prev) => [...prev, { arg: "", type: "u" }]);
            }}
          >
            <span className="flex items-center gap-2">
              <span className="text-[var(--color-accent)] text-3xl">+</span> Add
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
        <div className="overflow-y-auto flex-1 flex flex-col gap-4 py-4 max-h-[32rem]">
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
      </div>
    </div>
  );
}
