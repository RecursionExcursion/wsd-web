"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Process } from "../types/process";
import { downloadExecutable } from "../service/downloadService";
import Button from "./base/Button";
import Input from "./base/Input";
import Select from "./base/Select";
// import { LocalStorageService } from "../service/localStorageService";
import Spinner from "./base/Spinner";
import { emitter } from "../lib/events/EventEmittor";
import { LS_Deployable } from "../service/localStorageService";
import { eventKeys } from "../lib/events/events";

const createProcess = (): Process => {
  return {
    type: "path",
    arg: "",
  };
};

export default function DeployableCreator() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveProcess, setSaveProcesss] = useState(false);

  useEffect(() => {
    addProcess();
    setLoaded(true);

    const updateContent = (data: { content: LS_Deployable }) => {
      setProcesses(data.content.processes);
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
    setLoading(true);

    const lazyLocalStorage = await import("../service/localStorageService");

    if (saveProcess) {
      lazyLocalStorage.default.save("saved", {
        timestamp: Date.now(),
        processes,
        saved: false,
      });
    }

    lazyLocalStorage.default.save("last", {
      timestamp: Date.now(),
      processes,
      saved: false,
    });

    const success = await downloadExecutable(processes);
    console.log({ success });

    setLoading(false);

    emitter.emit(eventKeys.updateSideBar);
  }

  const controlInterface = () => {
    return (
      <div className="flex gap-4">
        <Button disabled={loading} onClick={createExecutable}>
          {loading ? Spinner() : "Create Executable"}
        </Button>
        <Button onClick={addProcess}>Add Process</Button>
        <Button
          onClick={() => {
            console.log("click");
            setSaveProcesss(!saveProcess);
          }}
        >
          <div className="flex items-center gap-3 cursor-pointer">
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
        </Button>
      </div>
    );
  };

  return (
    loaded && (
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
                <Button onClick={(e) => removeProcess(e, proc)}>Remove</Button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
