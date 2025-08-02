"use client";

import { ChangeEvent, CSSProperties } from "react";
import { iconServer } from "../../assets/icons";

const inputStyles: CSSProperties = {
  border: "1px solid white",
  background: "transparent",
  padding: "4px",
  borderRadius: ".25rem",
};

export type ArgType = "u" | "p" | "c";

export type RawProc = {
  type: ArgType;
  arg: string;
};

type ProcessLineProps = {
  proc: RawProc;
  index: number;
  removeProcessAction: () => void;
  handleSelectChange: (newVal: string) => void;
  handleInputChange: (newArg: string) => void;
};

export default function ProcessLine(props: ProcessLineProps) {
  const {
    proc,
    index: i,
    removeProcessAction,
    handleSelectChange,
    handleInputChange,
  } = props;

  return (
    <div
      key={proc.type + proc.type + i}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 7fr 1fr",
      }}
    >
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <select
          value={proc.type}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleSelectChange(e.target.value)
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
            handleInputChange(e.target.value)
          }
          type="text"
        />
        <button
          onClick={() => removeProcessAction()}
          style={{
            color: "#ff3911",
          }}
        >
          {iconServer({ iconKey: "delete", size: 30 })}
        </button>
      </div>
      <div className="flex justify-center items-center">{i + 1}</div>
    </div>
  );
}
