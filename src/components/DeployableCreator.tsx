"use client";

import { ChangeEvent, MouseEvent, useState } from "react";

export type Process = {
  type: "cmd" | "path";
  arg: string;
};

const createProcess = (): Process => {
  return {
    type: "path",
    arg: "",
  };
};

export default function DeployableCreator() {
  const [processes, setProcesses] = useState<Process[]>([]);

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
    // throw new Error("Function not implemented.");
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

  return (
    <div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setProcesses((prev) => [...prev, createProcess()]);
          }}
        >
          Add Process
        </button>
        <button
          onClick={() => {
            console.log(processes);

            // const data = extractData();
            // console.log(data);
          }}
        >
          Extract
        </button>
      </div>
      {processes.map((proc, i) => {
        return (
          <div key={proc.type + proc.type + i} className="text-red-600">
            <select
              value={proc.type}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleSelectChange(e, proc)
              }
            >
              <option value={"path"}>Path</option>
              <option value={"cmd"}>Command</option>
            </select>
            <input
              value={proc.arg}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e, proc)
              }
              type="text"
            />
            <button onClick={(e) => removeProcess(e, proc)}>
              Remove Process
            </button>
          </div>
        );
      })}
    </div>
  );
}
