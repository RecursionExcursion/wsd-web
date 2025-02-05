"use client";

import { useEffect, useState } from "react";
import { Process } from "../../types/process";
import ControlPanel from "./ControlPanel";
import DeployableDisplay from "./DeployableDisplay";
import { emitter } from "../../lib/events/EventEmittor";
import { downloadExecutable } from "../../service/downloadService";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import { useSpinner } from "../../hook/UseSpinner";

export default function MainDisplay() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(true);
  const [supportedOs, setSupportedOs] = useState<string[]>([]);
  const [saveProcess, setSaveProcesss] = useState(false);
  const [targetOs, setTargetOs] = useState("");
  const [name, setName] = useState("");
  const spinner = useSpinner();

  useEffect(() => {
    getSupportedOs().then((sos) => {
      setSupportedOs(sos);
      setTargetOs(sos[0]);
      // setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (processes.length === 0) {
      setProcesses([createProcess()]);
    }
  }, [processes]);

  const resetProcesses = () => {
    setProcesses([createProcess()]);
  };

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
  const createProcess = (): Process => {
    return {
      type: "path",
      arg: "",
    };
  };

  function addProcess() {
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
    <div className="w-full h-full flex justify-center items-center">
      {spinner}
    </div>
  ) : (
    <div
      className="bg-black bg-opacity-50 p-10 rounded-lg
    flex w-[60rem] h-[40rem] overflow-y-auto"
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
        resetAction={resetProcesses}
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
