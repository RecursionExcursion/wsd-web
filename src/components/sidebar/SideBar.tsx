"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import DeployableMenu from "./DeployableMenu";
import { HowToUseDisplay } from "../HowToUse";
import MainAnimation from "../animations/MainAni";

const wrapperStyle = {
  closed: "h-full z-10 flex flex-col",
  open: "h-full  z-10 bg-black bg-opacity-75 flex flex-col",
};

export default function SideBar() {
  const [showMenu, setShowMenu] = useState(true);
  const [showHowToUse, setShowHowToUse] = useState(true);

  return (
    <div
      className={
        showMenu || showHowToUse ? wrapperStyle.open : wrapperStyle.closed
      }
    >
      <div className="relative bg-[url('/hero-bg.png')] bg-cover bg-center bg-opacity-50 w-full p-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/nebula.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <h1
          className={`text-5xl xl:text-7xl flex flex-col gap-10`}
          style={{ fontFamily: "var(--font-doto), sans-serif" }}
        >
          Workspace Deployer
          <MainAnimation />
        </h1>
      </div>

      <div className="flex-grow flex">
        <HowToUseDisplay />
      </div>

      <div className="flex-grow flex flex-col gap-5 mb-20">
        <DeployableMenu type="saved" />
        <DeployableMenu type="last" />
      </div>

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
