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
import { SpinnerAnimationAndText } from "./Spinner";
import { useApiConnectionWatcher } from "../../hooks/UseApiConnectionWatcher";
import { createPortal } from "react-dom";

export default function MainDisplay() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(false);
  const [supportedOs, setSupportedOs] = useState<string[]>([]);
  const [saveProcess, setSaveProcesss] = useState(false);
  const [targetOs, setTargetOs] = useState("");
  const [name, setName] = useState("");
  const [connectionStatusPortalTarget, setConnectionStatusPortalTarget] =
    useState<HTMLElement>();

  const { isConnected, connect, ConnectionStatus } = useApiConnectionWatcher();

  const [noConnection, setNoConnection] = useState(false);

  useEffect(() => {
    connect(async () => {
      await initRoutes();
      const sos = await getSupportedOs();
      
      if (sos[0].length === 0) {
        setNoConnection(true);
        return;
      }

      const sortedOs = sos.sort().reverse();

      setSupportedOs(sortedOs);
      setTargetOs(sortedOs[0]);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, []);

  useEffect(() => {
    const target = document.getElementById("connection-status");
    if (target) {
      setConnectionStatusPortalTarget(target);
    }
  }, []);

  const resetProcesses = () => {
    setName("");
    setProcesses([createProcess()]);
  };

  const updateTarget = (tar: string) => {
    setTargetOs(tar);
  };

  async function createExecutable() {
    if (!isConnected) return;

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

  return (
    <>
      {noConnection ? (
        <NoConnectionToBackendNotice />
      ) : loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <SpinnerAnimationAndText type={"building"} />
        </div>
      ) : (
        <div>
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
              isConnected={isConnected}
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
        </div>
      )}
      {connectionStatusPortalTarget &&
        createPortal(ConnectionStatus(), connectionStatusPortalTarget)}
    </>
  );
}
