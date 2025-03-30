"use client";

import { ChangeEvent, CSSProperties, useEffect, useRef } from "react";
import { Process } from "../../types/process";
import ProcessLine from "./ProcessLine";

type DeployableDisplayProps = {
  processes: Process[];
  name: string;
  updateNameAction: (newName: string) => void;
  setProcessAction: (oldProcess: Process, newProcess: Process) => void;
  removeProcessAction: (process: Process) => void;
  addProcessAction: () => void;
};

export default function DeployableDisplay(props: DeployableDisplayProps) {
  const {
    processes,
    setProcessAction,
    removeProcessAction,
    name,
    updateNameAction,
    addProcessAction,
  } = props;

  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({
        top: scrollableContainerRef.current.scrollHeight,
      });
    }
  }, [scrollableContainerRef, processes]);

  function updateArgInput(newArg: string, proc: Process): void {
    const searchedProc = processes.find(
      (p) => p.type === proc.type && p.arg === proc.arg
    );

    if (searchedProc) {
      setProcessAction(searchedProc, { ...searchedProc, arg: newArg });
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

  return (
    <div
      className="flex flex-col gap-5 justify-start items-center md:overflow-y-auto md:overflow-x-hidden md:max-h-[80%] py-8"
      ref={scrollableContainerRef}
    >
      <div className="flex gap-2 items-center">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateNameAction(e.target.value)
          }
          style={{ ...inputStyles }}
        />
      </div>
      <div className="flex flex-col w-full gap-4">
        {processes.map((proc, i) => {
          return (
            <ProcessLine
              key={proc.type + proc.type + i}
              proc={proc}
              index={i}
              collectionLength={processes.length}
              addProcessAction={addProcessAction}
              removeProcessAction={removeProcessAction}
              handleInputChange={updateArgInput}
              handleSelectChange={updateTypeSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

const inputStyles: CSSProperties = {
  border: "1px solid white",
  background: "transparent",
  padding: "4px",
  borderRadius: ".25rem",
};
