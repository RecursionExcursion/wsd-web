"use client";

import { ChangeEvent, CSSProperties } from "react";
import { Process } from "../../types/process";
import { iconServer } from "../../assets/icons";

type DeployableDisplayProps = {
  processes: Process[];
  name: string;
  updateNameAction: (newName: string) => void;
  setProcessAction: (oldProcess: Process, newProcess: Process) => void;
  removeProcessAction: (process: Process) => void;
};

export default function DeployableDisplay(props: DeployableDisplayProps) {
  const {
    processes,
    setProcessAction,
    removeProcessAction,
    name,
    updateNameAction,
  } = props;

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement>,
    proc: Process
  ): void {
    const searchedProc = processes.find(
      (p) => p.type === proc.type && p.arg === proc.arg
    );

    if (searchedProc) {
      setProcessAction(searchedProc, { ...searchedProc, arg: e.target.value });
    }
  }

  function handleSelectChange(
    e: ChangeEvent<HTMLSelectElement>,
    proc: Process
  ): void {
    const searchedProc = processes.find(
      (p) => p.type === proc.type && p.arg === proc.arg
    );

    const newVal = e.target.value;

    if (searchedProc && (newVal === "cmd" || newVal === "path")) {
      setProcessAction(searchedProc, { ...searchedProc, type: newVal });
    }
  }

  return (
    <div className="flex flex-col gap-5 justify-start items-center">
      <div className="flex gap-2 items-center">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateNameAction(e.target.value)
          }
          style={{ ...inputStyles }}
        />
      </div>

      <div className="flex flex-col gap-5 w-full">
        {processes.map((proc, i) => {
          return (
            <div
              key={proc.type + proc.type + i}
              className="flex gap-5 items-center align-middle justify-center"
            >
              <select
                value={proc.type}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  handleSelectChange(e, proc)
                }
                style={{
                  ...inputStyles,
                  padding: "7px",
                }}
              >
                <option className="text-black" value={"path"}>Path</option>
                <option className="text-black" value={"cmd"}>Command</option>
              </select>
              <input
                value={proc.arg}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, proc)
                }
                type="text"
                style={{ ...inputStyles }}
              />
              <button
                onClick={() => removeProcessAction(proc)}
                style={{
                  color: "#ff3911",
                }}
              >
                {iconServer({ iconKey: "delete", size: 30 })}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const inputStyles: CSSProperties = {
  border: "1px solid white",
  background: "transparent",
  padding: "4px",
  borderRadius: ".25rem",
};
