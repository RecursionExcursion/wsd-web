"use client";

import { ChangeEvent, CSSProperties } from "react";
import { iconServer } from "../../assets/icons";
import { RawProc } from "../../service/browserScriptGen";

const inputStyles: CSSProperties = {
  border: "1px solid white",
  background: "transparent",
  padding: "4px",
  borderRadius: ".25rem",
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
    <div className="grid grid-cols-12 gap-2 items-center w-full min-w-0">
      <div className="col-span-1 flex justify-center">
        <select
          value={proc.type}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleSelectChange(e.target.value)
          }
          style={{
            ...inputStyles,
            padding: "7px",
          }}
          className="w-full max-w-20"
        >
          <option className="text-black" value={"p"}>
            Path
          </option>
          <option className="text-black" value={"u"}>
            Url
          </option>
          <option className="text-black" value={"c"}>
            Custom
          </option>
        </select>
      </div>
      
      <div className="col-span-10 min-w-0">
        <input
          style={{ ...inputStyles }}
          value={proc.arg}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e.target.value)
          }
          type="text"
          className="w-full"
        />
      </div>
      
      <div className="col-span-1 flex justify-center">
        <button
          onClick={() => removeProcessAction()}
          style={{
            color: "#ff3911",
          }}
          className="flex-shrink-0"
        >
          {iconServer({ iconKey: "delete", size: 30 })}
        </button>
      </div>
      
      <div className="col-span-12 flex justify-center items-center text-sm text-muted-lavender">
        {i + 1}
      </div>
    </div>
  );
}
