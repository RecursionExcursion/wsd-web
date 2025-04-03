"use client";

import MainAnimation from "./animations/MainAni";
import LogoTitle from "./LogoTitle";

export default function StickyHeader() {
  return (
    <div className="sticky top-0 w-full h-[12%] py-4 px-8 z-10">
      <div className="flex items-center gap-10">
        <LogoTitle />
        <MainAnimation />
      </div>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/nebula.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
