"use client";

import { useState } from "react";
import DeployableMenu from "./DeployableMenu";

export default function SideBar() {
  const [showMenubar, setShowMenuBar] = useState(false);

  const toggleButton = (text: string) => {
    return (
      <button
        className="border border-white w-full rounded-sm"
        onClick={() => setShowMenuBar(!showMenubar)}
      >
        {text}
      </button>
    );
  };

  const menuBar = () => {
    return (
      <div className="h-full w-80 absolute z-10 bg-black bg-opacity-75 flex flex-col gap-5">
        <div className="flex flex-col">{toggleButton("Hide")}</div>
        <div className="flex-grow flex flex-col gap-5">
          <DeployableMenu type="saved" />
          <DeployableMenu type="last" />
        </div>
      </div>
    );
  };

  const toggleButtonControl = () => {
    return (
      <div className="absolute w-80 flex">
        <div className="flex w-full">{toggleButton("Menu")}</div>
      </div>
    );
  };

  return showMenubar ? menuBar() : toggleButtonControl();
}
