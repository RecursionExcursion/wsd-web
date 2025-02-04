"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import DeployableMenu from "./DeployableMenu";
import { HowToUseDisplay } from "../HowToUse";

const wrapperStyle = {
  closed: "h-full w-80 absolute z-10 flex flex-col",
  open: "h-full w-80 absolute z-10 bg-black bg-opacity-75 flex flex-col",
};

export default function SideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  return (
    <div
      className={
        showMenu || showHowToUse ? wrapperStyle.open : wrapperStyle.closed
      }
    >
      <SideBarButton onClick={() => setShowMenu(!showMenu)}>Menu</SideBarButton>
      {showMenu && (
        <div className="flex-grow flex flex-col gap-5">
          <DeployableMenu type="saved" />
          <DeployableMenu type="last" />
        </div>
      )}
      <SideBarButton onClick={() => setShowHowToUse(!showHowToUse)}>
        How To Use
      </SideBarButton>
      {showHowToUse && (
        <div className="flex-grow flex">
          <HowToUseDisplay />
        </div>
      )}
    </div>
  );
}

type SideBarButtonProps = ComponentPropsWithoutRef<"button">;

const SideBarButton = (props: SideBarButtonProps) => {
  return (
    <button
      className="border border-white w-full rounded-sm"
      {...props}
    ></button>
  );
};
