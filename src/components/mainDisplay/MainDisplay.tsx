"use client";

import { useEffect, useState } from "react";
import { Process } from "../../types/process";
import ControlPanel from "./ControlPanel";
import DeployableDisplay from "./DeployableDisplay";
import { emitter } from "../../lib/events/EventEmittor";
import { downloadExecutable } from "../../service/downloadService";
import { eventKeys } from "../../lib/events/events";
import { LS_Deployable } from "../../service/localStorageService";
import { useSpinner } from "../../hooks/UseSpinner";
import NoConnectionToBackendNotice from "../NoConnectionToBackendNotice";

export default function MainDisplay() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [supportedOs, setSupportedOs] = useState<string[]>([]);
  const [saveProcess, setSaveProcesss] = useState(false);
  const [targetOs, setTargetOs] = useState("");
  const [name, setName] = useState("");

  const [noConnection, setNoConnection] = useState(false);

  useEffect(() => {
    getSupportedOs().then((sos) => {
      if (sos[0].length === 0) {
        setNoConnection(true);
        return;
      }

      setSupportedOs(sos[0]);
      setTargetOs(sos[0][0]);
      setLoading(false);
      setFirstLoad(false);
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

  useEffect(() => {
    if (processes.length === 0) {
    }
  }, [processes]);

  const resetProcesses = () => {
    setProcesses([createProcess()]);
  };

  const updateTarget = (tar: string) => {
    setTargetOs(tar);
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
    let iterations = 0;

    while (iterations <= 3) {
      const res = await fetch(`/api/os`);

      if (res.ok) {
        return (await res.json()) as string[][];
      }

      iterations++;
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    return [];
  };

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

type ConnectingToBackEndAnimationProps = {
  type: "init" | "building";
};

const SpinnerAnimationAndText = (props: ConnectingToBackEndAnimationProps) => {
  const initText = "Connecting to backend";
  const buildingText = "Building";

  const spinner = useSpinner();

  const [text, setText] = useState(
    props.type === "init" ? initText : buildingText
  );

  useEffect(() => {
    const inter = setInterval(() => {
      setText((prev) => {
        if (prev.endsWith("...")) {
          return prev.slice(0, -3);
        } else {
          return prev + ".";
        }
      });
    }, 500);

    return () => clearInterval(inter);
  }, []);

  return (
    <div>
      {spinner}
      {text}
    </div>
  );
};
