"use client";

import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import Button from "../base/Button";
import Input from "../base/Input";

import ProcessLine from "./ProcessLine";
import { Script } from "../../service/scriptService";

type MainDisplayProps = {
  script: Script;
  setScript: Dispatch<SetStateAction<Script>>;
};

export default function MainDisplay(props: MainDisplayProps) {
  const { script, setScript } = props;

  useEffect(() => {
    const updateContent = (data: { content: LS_Deployable }) => {
      setScript(
        script.setScript({
          name: data.content.name,
          args: data.content.args,
        })
      );
    };

    emitter.on(eventKeys.updateDeployable, updateContent);

    return () => {
      emitter.off(eventKeys.updateDeployable, updateContent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearScript() {
    setScript(script.reset());
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
            onClick={() => setScript(script.addArgs({ arg: "", type: "u" }))}
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
            value={script.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setScript(script.setName(e.target.value))
            }
          />
        </div>
        <div className="overflow-y-auto flex-1 flex flex-col gap-4 py-4 max-h-[32rem]">
          {script.args.map((sa, i) => (
            <ProcessLine
              key={i}
              proc={sa}
              index={i}
              removeProcessAction={() => setScript(script.removeArg(i))}
              handleSelectChange={(newVal: string): void => {
                setScript(script.editArg(newVal, i, "type"));
              }}
              handleInputChange={(newArg: string): void => {
                setScript(script.editArg(newArg, i, "arg"));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
