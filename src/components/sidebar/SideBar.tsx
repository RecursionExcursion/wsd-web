"use client"

import DeployableMenu from "./DeployableMenu";
import { HowToUseDisplay } from "../HowToUse";

export default function SideBar() {
  return (
    <div className="flex-grow max-w-[20%] min-w-52 bg-black bg-opacity-75 flex flex-col">
      <div id="connection-status" className="flex w-full h-10 items-center justify-center"></div>

      <SideBarTitle text="Menu" />
      <div className="flex-grow flex flex-col gap-5 px-2 py-1">
        <DeployableMenu type="saved" />
        <DeployableMenu type="last" />
      </div>
      <SideBarTitle text="How to Use" />
      <div className="flex-grow flex">
        <HowToUseDisplay />
      </div>
    </div>
  );
}

const SideBarTitle = ({ text }: { text: string }) => {
  return (
    <div className="border border-white w-full rounded-sm text-center p-2">
      {text}
    </div>
  );
};
