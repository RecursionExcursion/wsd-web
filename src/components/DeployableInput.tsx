"use client";

import { ChangeEvent, useState } from "react";

export type ExtractedInput = {
  type: "cmd" | "path";
  arg: string;
};

export default function DeployableInput() {
  const [type, setType] = useState<ExtractedInput["type"]>("path");
  const [arg, setArg] = useState<string>("");

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const newVal = e.target.value;
    if (newVal === "path" || newVal === "cmd") {
      setType(newVal);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setArg(e.target.value);
  }
  
  return (
    <div className="text-red-600">
      <select value={type} onChange={handleSelectChange}>
        <option value={"path"}>Path</option>
        <option value={"cmd"}>Command</option>
      </select>
      <input value={arg} onChange={handleInputChange} type="text" />
    </div>
  );
}
