import { SUPPORTED_OS } from "./browserScriptGen";

export type ArgType = "u" | "p" | "c";

export type Process = {
  type: ArgType;
  arg: string;
};

/* Setters will all return a new instance */
interface ReactStateSetter {
  addArgs: (p: Process) => Script;
  editArg: (newArg: string, index: number, type: "arg" | "type") => Script;
  removeArg: (index: number) => Script;
  clearArgs: () => Script;
  setName: (n: string) => Script;
  setTarget: (t: SUPPORTED_OS) => Script;
  reset: () => Script;
  setScript: (s: Partial<ScriptType>) => Script;
}

export type ScriptType = {
  name: string;
  os: SUPPORTED_OS;
  args: Process[];
};

export class Script implements ReactStateSetter {
  name: string = "";
  targetOs: SUPPORTED_OS = "win";
  args: Process[] = [];

  constructor(args?: Process[], name?: string, target?: SUPPORTED_OS) {
    if (args) this.args = args;
    if (name) this.name = name;
    if (target) this.targetOs = target;
  }

  #createCopy() {
    return new Script([...this.args], this.name, this.targetOs);
  }

  toScriptType(): ScriptType {
    return {
      name: this.name,
      args: this.args,
      os: this.targetOs,
    };
  }

  addArgs(...p: Process[]) {
    return new Script([...this.args, ...p], this.name, this.targetOs);
  }
  clearArgs() {
    return new Script([], this.name, this.targetOs);
  }
  setName(n: string) {
    return new Script([...this.args], n, this.targetOs);
  }
  setTarget(t: SUPPORTED_OS) {
    return new Script([...this.args], this.name, t);
  }
  reset() {
    return new Script();
  }
  removeArg(index: number) {
    return new Script(
      this.args.filter((_, i) => i !== index),
      this.name,
      this.targetOs
    );
  }
  editArg(newArg: string, index: number, type: "arg" | "type") {
    const newScript = this.#createCopy();
    if (type === "arg") {
      newScript.args[index].arg = newArg;
    } else if (type === "type") {
      newScript.args[index].type = newArg as ArgType;
    }

    return newScript;
  }
  setScript(s: Partial<ScriptType>) {
    const newScript = this.#createCopy();
    if (s.name) newScript.name = s.name;
    if (s.args) newScript.args = s.args;
    if (s.os) newScript.targetOs = s.os;
    return newScript;
  }
}
