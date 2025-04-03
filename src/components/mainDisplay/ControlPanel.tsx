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
  isConnected: boolean;
};

export default function ControlPanel(props: ControlPanelProps) {
  const {
    supportedOs,
    createAction,
    saveAction,
    savedState,
    resetAction,
    updateTarget,
    isConnected,
  } = props;

  return (
    <div className="flex flex-col justify-around items-center">
      <button
        onClick={resetAction}
        style={{ ...controlContainerStyle, color: "#ff11f1" }}
      >
        {iconServer({ iconKey: "egg", size: 20 })} NEW
      </button>

      <div
        style={{
          ...controlContainerStyle,
        }}
      >
        {iconServer({ iconKey: "monitorIcon", size: 20 })}
        <span>OS:</span>
        <select
          className="cursor-pointer"
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
        disabled={!isConnected}
        onClick={createAction}
        className="text-[#11d4ff] disabled:text-gray-500 disabled:cursor-not-allowed"
        style={{
          // color: "",
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
