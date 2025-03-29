"use client";

import { ChangeEvent, CSSProperties } from "react";
import { iconServer } from "../../assets/icons";
import { Process } from "../../types/process";

const inputStyles: CSSProperties = {
  border: "1px solid white",
  background: "transparent",
  padding: "4px",
  borderRadius: ".25rem",
};

type ProcessLineProps = {
  proc: Process;
  index: number;
  collectionLength: number;
  addProcessAction: () => void;
  removeProcessAction: (proc: Process) => void;
  handleSelectChange: (newVal: string, proc: Process) => void;
  handleInputChange: (newArg: string, proc: Process) => void;
};

export default function ProcessLine(props: ProcessLineProps) {
  const {
    proc,
    index: i,
    addProcessAction,
    removeProcessAction,
    handleSelectChange,
    handleInputChange,
    collectionLength,
  } = props;

  return (
    <div
      key={proc.type + proc.type + i}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 7fr 1fr",
      }}
    >
      <div className="flex justify-center items-center">{i + 1}</div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={proc.type}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleSelectChange(e.target.value, proc)
            }
            style={{
              ...inputStyles,
              padding: "7px",
            }}
          >
            <option className="text-black" value={"path"}>
              Path
            </option>
            <option className="text-black" value={"cmd"}>
              Command
            </option>
          </select>
          <input
            style={{ ...inputStyles }}
            value={proc.arg}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value, proc)
            }
            type="text"
          />
        </div>
        <button
          onClick={() => removeProcessAction(proc)}
          style={{
            color: "#ff3911",
          }}
        >
          {iconServer({ iconKey: "delete", size: 30 })}
        </button>
      </div>
      <div className="flex justify-center items-center">
        {i === collectionLength - 1 && (
          <button
            onClick={addProcessAction}
            style={{
              color: "#47e025",
            }}
          >
            {iconServer({ iconKey: "add", size: 30 })}
          </button>
        )}
      </div>
    </div>
  );
}
