"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Process } from "../types/process";
import { downloadExecutable } from "../service/downloadService";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

const createProcess = (): Process => {
  return {
    type: "path",
    arg: "",
  };
};

export default function DeployableCreator() {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    addProcess();
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

  const controlInterface = () => {
    return (
      <div className="flex gap-4">
        <Button onClick={async () => await downloadExecutable(processes)}>
          Create Executable
        </Button>
        <Button onClick={addProcess}>Add Process</Button>
        <Button onClick={() => console.log(processes)}>Extract</Button>
      </div>
    );
  };

  return (
    <div className="w-[80%] flex flex-col gap-5 justify-center items-center">
      {controlInterface()}
      <div className="flex flex-col gap-5 w-full">
        {processes.map((proc, i) => {
          return (
            <div key={proc.type + proc.type + i} className="flex gap-5 items-center align-middle justify-center">
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
  );
}
