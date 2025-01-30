import { Process } from "../types/process";

export async function downloadExecutable(
  processes: Process[]
): Promise<boolean> {
  try {
    const res = await fetch("/api/download", {
      method: "POST",
      body: JSON.stringify(processes),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to download the file");
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
