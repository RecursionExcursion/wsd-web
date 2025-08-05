"use client";

import { useEffect, useState } from "react";
import {
  genScript,
  RawProc,
  SUPPORTED_OS,
} from "../../service/browserScriptGen";
import DeployableMenu from "../sidebar/DeployableMenu";
import FooterControls from "./FooterContols";
import MainDisplay from "./MainDisplay";
import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import { download } from "../../service/downloadToBrowserService";
import OsRadio from "../OsRadio";

export default function MainLayout() {
  const [targetOs, setTargetOs] = useState<SUPPORTED_OS>("win");
  const [name, setName] = useState("");
  const [scriptArgs, setScriptArgs] = useState<RawProc[]>([
    {
      type: "u",
      arg: "",
    },
  ]);

  useEffect(() => {
    console.log(targetOs);
  }, [targetOs]);

  async function save() {
    const sanitizedName = name.trim();
    const sanitizedProcesses = scriptArgs.filter((p) => p.arg.trim() !== "");

    if (!sanitizedProcesses.length || !sanitizedName) return;

    const lazyLocalStorage = await import("../../service/localStorageService");
    lazyLocalStorage.default.save("saved", {
      name: sanitizedName,
      os: targetOs,
      timestamp: Date.now(),
      processes: sanitizedProcesses,
    });

    emitter.emit(eventKeys.updateSideBar);
  }

  async function create() {
    if (!name || scriptArgs.length === 0) return;

    const ret = genScript(targetOs, name, scriptArgs);

    const res = download(ret.script, ret.name);
    console.log({ res });

    if (res) {
      const lazyLocalStorage = await import(
        "../../service/localStorageService"
      );
      lazyLocalStorage.default.save("last", {
        name: name.trim(),
        os: targetOs,
        timestamp: Date.now(),
        processes: scriptArgs,
      });
      emitter.emit(eventKeys.updateSideBar);
    }
  }

  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-y-hidden">
      <div className="grid grid-cols-2 gap-4 flex-1  px-4">
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Menu</h2>
          <div
            id="connection-status"
            className="flex w-full h-10 items-center justify-center"
          ></div>
          <div className="flex-1 text-center flex flex-col gap-5">
            <h3 className="text-3xl">Target Operating System</h3>
            <OsRadio setOs={setTargetOs} curr={targetOs} />
          </div>
          <div className="flex-1 text-center flex flex-col gap-5">
            <h3 className="text-3xl">Previously Created</h3>
            <DeployableMenu type="saved" />
            <DeployableMenu type="last" />
          </div>
        </div>
        <MainDisplay
          name={name}
          scriptArgs={scriptArgs}
          setName={setName}
          setScriptArgs={setScriptArgs}
        />
      </div>
      <FooterControls create={create} save={save} />
    </div>
  );
}
