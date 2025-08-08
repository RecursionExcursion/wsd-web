"use client";

import { useState } from "react";
import { genScript, SUPPORTED_OS } from "../../service/browserScriptGen";
import DeployableMenu from "../sidebar/DeployableMenu";
import FooterControls from "./FooterContols";
import MainDisplay from "./MainDisplay";
import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import { download } from "../../service/downloadToBrowserService";
import OsRadio from "../OsRadio";
import { Script } from "../../service/scriptService";

export default function MainLayout() {
  const [script, setScript] = useState<Script>(new Script());

  async function save() {
    const sanitizedName = script.name.trim();
    const sanitizedProcesses = script.args.filter((p) => p.arg.trim() !== "");

    if (!sanitizedProcesses.length || !sanitizedName) return;

    const lazyLocalStorage = await import("../../service/localStorageService");
    lazyLocalStorage.default.save("saved", {
      timestamp: Date.now(),
      script,
    });

    emitter.emit(eventKeys.updateSideBar);
  }

  async function create() {
    if (!script.name || script.args.length === 0) return;

    const ret = genScript(script.targetOs, script.name, script.args);

    const res = download(ret.script, ret.name);

    if (res) {
      const lazyLocalStorage = await import(
        "../../service/localStorageService"
      );
      lazyLocalStorage.default.save("last", {
        timestamp: Date.now(),
        script,
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
            <OsRadio
              setOs={(s: SUPPORTED_OS) => {
                setScript(script.setTarget(s));
              }}
              curr={script.targetOs}
            />
          </div>
          <div className="flex-1 text-center flex flex-col gap-5">
            <h3 className="text-3xl">Previously Created</h3>
            <DeployableMenu type="saved" />
            <DeployableMenu type="last" />
          </div>
        </div>
        <MainDisplay script={script} setScript={setScript} />
      </div>
      <FooterControls create={create} save={save} />
    </div>
  );
}
