"use client";

import { ChangeEvent } from "react";
import { iconServer } from "../assets/icons";
import Select from "./Select";

type OsSelectorProps = {
  updateTarget: (s: string) => void;
  supportedOs: string[];
};

export default function OsSelector(props: OsSelectorProps) {
  const { updateTarget, supportedOs } = props;
  return (
    <div
      className="flex items-center justify-center
                            rounded-lg border border-[#22272c]
                            p-1 gap-1 w-fit"
    >
      {iconServer({ iconKey: "monitorIcon", size: 20 })}
      <span>OS:</span>
      <Select
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
      </Select>
    </div>
  );
}
