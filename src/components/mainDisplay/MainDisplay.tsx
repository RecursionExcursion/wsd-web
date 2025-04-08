"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Process } from "../../types/process";
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
import Button from "../base/Button";
import Input from "../base/Input";
import ProcessLine from "./ProcessLine";
import OsSelector from "../OsSelector";
import { usePortal } from "../../hooks/usePortal";

export default function MainDisplay() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(false);
  const [supportedOs, setSupportedOs] = useState<string[]>([]);
  const [targetOs, setTargetOs] = useState("");
  const [name, setName] = useState("");

  const { isConnected, connect, ConnectionStatus } = useApiConnectionWatcher();
  const { renderPortal } = usePortal({
    targetId: "connection-status",
    node: ConnectionStatus(),
  });

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

  function updateTypeSelect(newVal: string, proc: Process): void {
    const searchedProc = processes.find(
      (p) => p.type === proc.type && p.arg === proc.arg
    );

    if (searchedProc && (newVal === "cmd" || newVal === "path")) {
      setProcessAction(searchedProc, { ...searchedProc, type: newVal });
    }
  }

  function updateArgInput(newArg: string, proc: Process): void {
    const searchedProc = processes.find(
      (p) => p.type === proc.type && p.arg === proc.arg
    );

    if (searchedProc) {
      setProcessAction(searchedProc, { ...searchedProc, arg: newArg });
    }
  }

  async function handleSaveClick() {
    const sanitizedName = name.trim() === "" ? undefined : name.trim();
    const sanitizedProcesses = processes.filter((p) => p.arg.trim() !== "");

    if (!sanitizedProcesses || !sanitizedName) {
      return;
    }

    const lazyLocalStorage = await import("../../service/localStorageService");
    lazyLocalStorage.default.save("saved", {
      name: sanitizedName,
      os: targetOs,
      timestamp: Date.now(),
      processes: sanitizedProcesses,
    });
    emitter.emit(eventKeys.updateSideBar);
  }

  return (
    <>
      {noConnection ? (
        <NoConnectionToBackendNotice />
      ) : (
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-6 overflow-y-auto h-[80%]">
            <Button onClick={resetProcesses}>
              <span className="flex items-center gap-2">
                <span className="text-[var(--color-accent)] text-3xl">+</span>{" "}
                New
              </span>
            </Button>
            <div className="flex flex-col gap-2 items-start">
              <label>Name</label>
              <Input
                className="ml-2"
                type="text"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
            <div className="w-[35rem] h-full">
              {loading ? (
                <div className="flex h-full w-full justify-center items-center">
                  <SpinnerAnimationAndText type={"none"} />
                </div>
              ) : (
                <div className="flex flex-col gap-5 w-full bg-[var(--color-tertiary)] rounded-lg py-2">
                  {processes.map((proc, i) => {
                    return (
                      <ProcessLine
                        key={proc.type + proc.type + i}
                        proc={proc}
                        index={i}
                        collectionLength={processes.length}
                        addProcessAction={addProcess}
                        removeProcessAction={removeProcess}
                        handleInputChange={updateArgInput}
                        handleSelectChange={updateTypeSelect}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10 h-[20%]">
            <Button className="text-xl" onClick={handleSaveClick}>
              Save
            </Button>
            <div className="flex gap-4">
              <OsSelector
                updateTarget={updateTarget}
                supportedOs={supportedOs}
              />

              <Button
                disabled={!isConnected || loading}
                className="text-xl disabled:text-gray-500 disabled:cursor-not-allowed"
                onClick={createExecutable}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
      {renderPortal()}
    </>
  );
}
