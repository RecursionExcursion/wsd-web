"use client";

import { CSSProperties } from "react";
import { iconServer } from "../../assets/icons";

type ControlPanelProps = {
  supportedOs: string[];
  addProcessAction: () => void;
  saveAction: () => void;
  savedState: boolean;
  createAction: () => void;
};

export default function ControlPanel(props: ControlPanelProps) {
  const {
    supportedOs,
    addProcessAction,
    createAction,
    saveAction,
    savedState,
  } = props;

  return (
    <div className="flex flex-col justify-around items-center">
      <div
        style={{
          ...controlContainerStyle,
        }}
      >
        {iconServer({ iconKey: "monitorIcon", size: 20 })}
        <span>OS:</span>
        <select
          style={{
            background: "transparent",
          }}
        >
          {supportedOs.map((sos) => (
            <option className="text-black" key={sos} value={sos}>
              {sos}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={addProcessAction}
        style={{
          color: "#47e025",
          ...controlContainerStyle,
        }}
      >
        {iconServer({ iconKey: "add", size: 20 })} ADD
      </button>
      <button
        onClick={saveAction}
        style={{
          color: savedState ? "#47e025" : "#ff3911",
          ...controlContainerStyle,
        }}
      >
        {iconServer({ iconKey: savedState ? "check" : "x", size: 20 })}
        SAVE
      </button>
      <button
        onClick={createAction}
        style={{
          color: "#11d4ff",
          ...controlContainerStyle,
        }}
      >
        {iconServer({ iconKey: "blocks", size: 20 })}
        CREATE
      </button>
    </div>
  );
}

const controlContainerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid",
  borderRadius: ".25rem",
  padding: ".25rem",
  gap: ".25rem",
  width: "80%",
};
