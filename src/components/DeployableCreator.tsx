"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Process } from "../types/process";
import { downloadExecutable } from "../service/downloadService";
import Button from "./base/Button";
import Input from "./base/Input";
import Select from "./base/Select";
import Spinner from "./base/Spinner";
import { emitter } from "../lib/events/EventEmittor";
import { LS_Deployable } from "../service/localStorageService";
import { eventKeys } from "../lib/events/events";
import { useModal } from "../hooks/useBodyModal";
import { HowToUseModal } from "./HowToUse";

const createProcess = (): Process => {
  return {
    type: "path",
    arg: "",
  };
};

type DeployableCreatorProps = {
  supportedOs: string[];
};

export default function DeployableCreator(props: DeployableCreatorProps) {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveProcess, setSaveProcesss] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const { modal } = useModal({
    condition: showHowToUse,
    content: <HowToUseModal closeFn={() => setShowHowToUse(false)} />,
  });
  const [targetOs, setTargetOs] = useState(props.supportedOs[0]);
  const [name, setName] = useState("");

  useEffect(() => {
    addProcess();
    setLoaded(true);

    const updateContent = (data: { content: LS_Deployable }) => {
      setProcesses(data.content.processes);
      setTargetOs(data.content.os);
    };

    emitter.on(eventKeys.updateDeployable, updateContent);

    return () => {
      emitter.off(eventKeys.updateDeployable, updateContent);
    };
  }, []);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>,
    proc: Process
  ): void {
    const copyProcesses = [...processes];

    const copyProc = copyProcesses.find(
      (p) => p.type === proc.type && p.arg === proc.arg
    );

    if (copyProc) {
      copyProc.arg = e.target.value;
      setProcesses(copyProcesses);
    }
  }

  function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>,
    proc: Process
  ): void {
    const copyProcesses = [...processes];

    const copyProc = copyProcesses.find(
      (p) => p.type === proc.type && p.arg === proc.arg
    );

    const newVal = e.target.value;

    if (copyProc && (newVal === "cmd" || newVal === "path")) {
      copyProc.type = newVal;
      setProcesses(copyProcesses);
    }
  }

  function addProcess() {
    setProcesses((prev) => [...prev, createProcess()]);
  }

  function removeProcess(
    e: MouseEvent<HTMLButtonElement>,
    proc: Process
  ): void {
    const copyProcesses = [...processes];
    const indexToRemove = copyProcesses.findIndex(
      (p) => p.type === proc.type && p.arg === proc.arg
    );
    if (indexToRemove >= 0) {
      copyProcesses.splice(indexToRemove, 1);
      setProcesses(copyProcesses);
    }
  }

  async function createExecutable() {
    //Sanitaze process inputs
    const sanitizedProcesses = processes.filter((p) => p.arg.trim() !== "");
    setProcesses(sanitizedProcesses);

    if (sanitizedProcesses.length <= 0) {
      return;
    }

    setLoading(true);

    const sanitizedName = name.trim() === "" ? undefined : name.trim();

    const lazyLocalStorage = await import("../service/localStorageService");

    if (saveProcess) {
      lazyLocalStorage.default.save("saved", {
        name: sanitizedName,
        os: targetOs,
        timestamp: Date.now(),
        processes: sanitizedProcesses,
      });
    }

    lazyLocalStorage.default.save("last", {
      name: sanitizedName,
      os: targetOs,
      timestamp: Date.now(),
      processes: sanitizedProcesses,
    });

    const success = await downloadExecutable({
      name: sanitizedName,
      target: targetOs,
      processes: sanitizedProcesses,
    });
    console.log({ success });

    setLoading(false);

    emitter.emit(eventKeys.updateSideBar);
  }

  const controlInterface = () => {
    return (
      <div
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
          gridAutoRows: "minmax(3rem, auto)",
          gap: "1rem",
        }}
      >
        <Button disabled={loading || showHowToUse} onClick={createExecutable}>
          {loading ? Spinner() : "Create"}
        </Button>
        <Button onClick={addProcess} disabled={showHowToUse}>
          Add Process
        </Button>
        <Button
          onClick={() => setShowHowToUse(!showHowToUse)}
          disabled={showHowToUse}
        >
          How to use
        </Button>
        <Button
          onClick={() => {
            console.log("click");
            setSaveProcesss(!saveProcess);
          }}
          disabled={showHowToUse}
        >
          <div className="flex items-center justify-center cursor-pointer">
            <div className="flex gap-3">
              <label className="cursor-pointer">Save</label>
              <Input
                style={{
                  cursor: "pointer",
                }}
                type="checkbox"
                checked={saveProcess}
                readOnly
              />
            </div>
          </div>
        </Button>
        <div
          className="flex justify-center items-center gap-1 relative text-white 
        bg-gradient rounded-lg"
        >
          <label>OS:</label>

          <Select
            styleKey="transparent"
            value={targetOs}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setTargetOs(e.target.value)
            }
          >
            {props.supportedOs.map((sos) => (
              <option key={sos} value={sos}>
                {sos}
              </option>
            ))}
          </Select>
        </div>
        <div
          className="flex justify-center items-center gap-1 relative text-white 
        bg-gradient rounded-lg text-center px-2 py-1 gap-1"
        >
          <label>{"Name:"}</label>
          <Input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          ></Input>
        </div>
      </div>
    );
  };

  return (
    loaded && (
      <>
        <div className="w-[50%] flex flex-col gap-5 justify-center items-center">
          {controlInterface()}
          <div className="flex flex-col gap-5 w-full">
            {processes.map((proc, i) => {
              return (
                <div
                  key={proc.type + proc.type + i}
                  className="flex gap-5 items-center align-middle justify-center"
                >
                  <Select
                    value={proc.type}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleSelectChange(e, proc)
                    }
                  >
                    <option value={"path"}>Path</option>
                    <option value={"cmd"}>Command</option>
                  </Select>
                  <Input
                    value={proc.arg}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, proc)
                    }
                    type="text"
                  />
                  <Button onClick={(e) => removeProcess(e, proc)}>
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        {modal()}
      </>
    )
  );
}
