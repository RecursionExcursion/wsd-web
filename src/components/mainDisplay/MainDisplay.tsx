"use client";

import { useEffect, useState } from "react";
import { Process } from "../../types/process";
import ControlPanel from "./ControlPanel";
import DeployableDisplay from "./DeployableDisplay";
import { emitter } from "../../lib/events/EventEmittor";
import { downloadExecutable } from "../../service/downloadService";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import NoConnectionToBackendNotice from "../NoConnectionToBackendNotice";
import { initRoutes } from "../../service/getRoutesService";
import { getSupportedOs } from "../../service/supportedOsService";
import { createProcess } from "../../service/processService";
// import { warmupAndPoll } from "../../service/apiStatusPollingService";
import { SpinnerAnimationAndText } from "./Spinner";

export default function MainDisplay() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [supportedOs, setSupportedOs] = useState<string[]>([]);
  const [saveProcess, setSaveProcesss] = useState(false);
  const [targetOs, setTargetOs] = useState("");
  const [name, setName] = useState("");
  // const [isReady, setIsReady] = useState(false);

  const [noConnection, setNoConnection] = useState(false);

  // useEffect(() => {
  //   warmupAndPoll();

  //   const setReadyStatus = (data: { content: boolean }) => {
  //     if (data.content) {
  //       setIsReady(data.content);
  //     }
  //   };

  //   emitter.on(eventKeys.backendReady, setReadyStatus);

  //   return () => {
  //     emitter.off(eventKeys.backendReady, setReadyStatus);
  //   };
  // }, []);

  useEffect(() => {
    initRoutes().then(() => {
      getSupportedOs().then((sos) => {
        if (sos[0].length === 0) {
          setNoConnection(true);
          return;
        }

        const sortedOs = sos.sort().reverse();

        setSupportedOs(sortedOs);
        setTargetOs(sortedOs[0]);
        setLoading(false);
        setFirstLoad(false);
      });
    });
  }, []);

  useEffect(() => {
    addProcess();

    const updateContent = (data: { content: LS_Deployable }) => {
      setProcesses(data.content.processes);
      setTargetOs(data.content.os);
      if (data.content.name) {
        setName(data.content.name);
      }
    };

    emitter.on(eventKeys.updateDeployable, updateContent);

    return () => {
      emitter.off(eventKeys.updateDeployable, updateContent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetProcesses = () => {
    setName("");
    setProcesses([createProcess()]);
  };

  const updateTarget = (tar: string) => {
    setTargetOs(tar);
  };

  async function createExecutable() {
    // if (!isReady) {
    //   console.log("Backend is not ready");
    //   return;
    // }

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

    // const success =
    await downloadExecutable({
      name: sanitizedName,
      target: targetOs,
      processes: sanitizedProcesses,
    });
    //TODO
    // console.log({ success });

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
    setProcesses((prev) => [...prev, createProcess()]);
  }

  function removeProcess(proc: Process): void {
    if (processes.length > 1) {
      const copyProcesses = [...processes];
      const indexToRemove = copyProcesses.findIndex(
        (p) => p.type === proc.type && p.arg === proc.arg
      );
      if (indexToRemove >= 0) {
        copyProcesses.splice(indexToRemove, 1);
        setProcesses(copyProcesses);
      }
    }
  }

  return noConnection ? (
    <NoConnectionToBackendNotice />
  ) : loading ? (
    <div className="w-full h-full flex justify-center items-center">
      <SpinnerAnimationAndText type={firstLoad ? "init" : "building"} />
    </div>
  ) : (
    <div
      className="bg-black bg-opacity-50 p-10 rounded-lg h-[40rem] overflow-y-auto"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <ControlPanel
        supportedOs={supportedOs}
        createAction={createExecutable}
        saveAction={() => setSaveProcesss(!saveProcess)}
        savedState={saveProcess}
        resetAction={resetProcesses}
        updateTarget={updateTarget}
      />
      <DeployableDisplay
        processes={processes}
        name={name}
        updateNameAction={(newName: string) => setName(newName)}
        setProcessAction={setProcessAction}
        removeProcessAction={removeProcess}
        addProcessAction={addProcess}
      />
    </div>
  );
}
