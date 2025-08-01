"use client";

export function download(script: BlobPart, name: string) {
  try {
    const blob = new Blob([script], {
      type: "application/octet-stream",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    a.download = name;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}
