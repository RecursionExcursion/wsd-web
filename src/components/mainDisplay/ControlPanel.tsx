"use client";

import { ChangeEvent, CSSProperties } from "react";
import { iconServer } from "../../assets/icons";

type ControlPanelProps = {
  supportedOs: string[];
  saveAction: () => void;
  savedState: boolean;
  createAction: () => void;
  resetAction: () => void;
  updateTarget: (s: string) => void;
};

export default function ControlPanel(props: ControlPanelProps) {
  const {
    supportedOs,
    createAction,
    saveAction,
    savedState,
    resetAction,
    updateTarget,
  } = props;

  console.log("supportedOs", supportedOs);

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center flex-1">
      <button
        className="h-fit p-4 "
        onClick={resetAction}
        style={{ ...controlContainerStyle, color: "#ff3911" }}
      >
        {iconServer({ iconKey: "trashCan", size: 20 })} CLEAR
      </button>

      <div
        className="h-fit p-4 "
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
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            updateTarget(e.target.value);
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
        className="h-fit p-4"

        onClick={saveAction}
        style={{
          color: savedState ? "#47e025" : "#ff11f1",
          ...controlContainerStyle,
        }}
      >
        {iconServer({ iconKey: savedState ? "check" : "save", size: 20 })}
        {savedState ? "SAVED" : "SAVE"}
      </button>
      <button
        className="h-fit p-4"

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
