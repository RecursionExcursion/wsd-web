"use client";

import { useEffect, useState } from "react";
import { Process } from "../../types/process";
import ControlPanel from "./ControlPanel";
import DeployableDisplay from "./DeployableDisplay";
import { emitter } from "../../lib/events/EventEmittor";
import { downloadExecutable } from "../../service/downloadService";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import Spinner from "../base/Spinner";

export default function MainDisplay() {
  const [processes, setProcesses] = useState<Process[]>([]);
  // const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [supportedOs, setSupportedOs] = useState<string[]>([]);
  const [saveProcess, setSaveProcesss] = useState(false);
  const [targetOs, setTargetOs] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getSupportedOs().then((sos) => {
      setSupportedOs(sos);
      setTargetOs(sos[0]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    addProcess();

    const updateContent = (data: { content: LS_Deployable }) => {
      setProcesses(data.content.processes);
      setTargetOs(data.content.os);
    };

    emitter.on(eventKeys.updateDeployable, updateContent);

    return () => {
      emitter.off(eventKeys.updateDeployable, updateContent);
    };
  }, []);

  async function createExecutable() {
    //Sanitaze process inputs
    const sanitizedProcesses = processes.filter((p) => p.arg.trim() !== "");
    setProcesses(sanitizedProcesses);

    if (sanitizedProcesses.length <= 0) {
      return;
    }

    setLoading(true);

    const sanitizedName = name.trim() === "" ? undefined : name.trim();

    const lazyLocalStorage = await import("../../service/localStorageService");

    if (saveProcess) {
      lazyLocalStorage.default.save("saved", {
        name: sanitizedName,
        os: targetOs,
        timestamp: Date.now(),
        processes: sanitizedProcesses,
      });
    }

    lazyLocalStorage.default.save("last", {
      name: sanitizedName,
      os: targetOs,
      timestamp: Date.now(),
      processes: sanitizedProcesses,
    });

    const success = await downloadExecutable({
      name: sanitizedName,
      target: targetOs,
      processes: sanitizedProcesses,
    });
    console.log({ success });

    setLoading(false);

    emitter.emit(eventKeys.updateSideBar);
  }

  function setProcessAction(oldProcess: Process, newProcess: Process) {
    const copyProcesses = [...processes];

    const indexedProc = copyProcesses.findIndex(
      (p) => p.type === oldProcess.type && p.arg === oldProcess.arg
    );

    if (indexedProc > -1) {
      copyProcesses[indexedProc] = newProcess;
      setProcesses(copyProcesses);
    }
  }

  function addProcess() {
    const createProcess = (): Process => {
      return {
        type: "path",
        arg: "",
      };
    };

    setProcesses((prev) => [...prev, createProcess()]);
  }

  function removeProcess(proc: Process): void {
    const copyProcesses = [...processes];
    const indexToRemove = copyProcesses.findIndex(
      (p) => p.type === proc.type && p.arg === proc.arg
    );
    if (indexToRemove >= 0) {
      copyProcesses.splice(indexToRemove, 1);
      setProcesses(copyProcesses);
    }
  }

  const getSupportedOs = async () => {
    const res = await fetch(`/api/os`);

    if (!res.ok) {
      return [];
    }

    return (await res.json()) as string[];
  };

  const updateName = (newName: string) => setName(newName);

  return loading ? (
    <Spinner />
  ) : (
    <div
      className="bg-black bg-opacity-50 p-10 rounded-lg
    flex w-[60rem] h-[40rem] overflow-y-auto
    "
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
      }}
    >
      <ControlPanel
        supportedOs={supportedOs}
        addProcessAction={addProcess}
        createAction={createExecutable}
        saveAction={() => setSaveProcesss(!saveProcess)}
        savedState={saveProcess}
      />
      <DeployableDisplay
        processes={processes}
        name={name}
        updateNameAction={updateName}
        setProcessAction={setProcessAction}
        removeProcessAction={removeProcess}
      />
    </div>
  );
}
