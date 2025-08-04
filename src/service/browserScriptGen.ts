"use client";

export type ArgType = "u" | "p" | "c";

export type RawProc = {
  type: ArgType;
  arg: string;
};

type ScriptType = {
  os: string;
  ext: string;
  template: (args: string[]) => string;
};

export type SUPPORTED_OS = "win" | "lin" | "mac";
export const SUPPORTED_OS: SUPPORTED_OS[] = ["win", "mac", "lin"];

export const prebuiltCmds = {
  openUrl: {
    win: (url: string) => `rundll32 url.dll,FileProtocolHandler ${url}`,
    mac: (url: string) => `open ${url}`,
    lin: (url: string) => `xdg-openrundll32 url.dll,FileProtocolHandler ${url}`,
  },
  openFile: {
    win: (path: string) => `start "" "${path.replace(/\//g, "\\").trim()}"`,
    mac: (path: string) => `open ${path}`,
    lin: (path: string) => `xdg-open "${path}"`,
  },
};

const templates: Record<SUPPORTED_OS, ScriptType> = {
  win: {
    os: "win",
    ext: ".bat",
    template: (args: string[]) => {
      return `@echo off\n${args.join("\n").trimEnd()}`;
    },
  },
  lin: {
    os: "linux",
    ext: ".desktop",
    template: (args: string[]) => {
      return `[Desktop Entry]\nName=Shortcut\nExec=${args
        .join("\n")
        .trimEnd()}\nType=Application`;
    },
  },
  mac: {
    os: "darwin",
    ext: ".command",
    template: (args: string[]) => {
      return `#!/bin/bash\n${args.join("\n").trimEnd()}`;
    },
  },
};

export function genScript(
  os: keyof typeof templates,
  name: string,
  args: RawProc[]
) {
  const processedArgs = args.map((arg) => {
    switch (arg.type) {
      case "u":
        return prebuiltCmds.openUrl[os](arg.arg.trim());
      case "p":
        return prebuiltCmds.openFile[os](arg.arg.trim());
      case "c":
        return arg.arg.trim();
    }
  });

  return {
    name: `${name}${templates[os].ext}`,
    script: templates[os].template(processedArgs),
  };
}
