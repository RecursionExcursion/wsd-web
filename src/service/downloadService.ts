import { Process } from "../types/process";

export type DownloadExecutablePayload = {
  name: string | undefined;
  target: string;
  processes: Process[];
};

export type DDWsdPayload = {
  name: string | undefined;
  arch: string;
  commands: string[];
};

export async function downloadExecutable(
  payload: DownloadExecutablePayload
): Promise<boolean> {
  //TODO need to sanitize processes (remove escape\ for /)
  const ddPayload: DDWsdPayload = {
    name: payload.name,
    arch: payload.target,
    commands: payload.processes.map((p) => {
      const prefix = p.type === "cmd" ? "cmd:" : "url:";

      let arg = p.arg;
      if (p.type === "cmd") {
        arg = arg.replaceAll("\\", "/");
      }

      return prefix + arg;
    }),
  };

  try {
    const res = await fetch("/api/download", {
      method: "POST",
      body: JSON.stringify(ddPayload),
      cache: "no-store",
    });

    if (!res.ok) {
      return false;
    }

    const contentDis = res.headers.get("content-disposition");

    const parts = contentDis?.split('"');
    const filename = parts?.[1] ?? "wsd-dl.exe";

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a link and trigger a download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Revoke the object URL
    window.URL.revokeObjectURL(url);

    return true;
  } catch {
    return false;
  }
}
