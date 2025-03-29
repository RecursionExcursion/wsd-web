import { NextRequest, NextResponse } from "next/server";
import { DownloadExecutablePayload } from "../../../service/downloadService";
import { getRouteVar } from "../../../service/externalAPIService";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const apiPath = await getRouteVar("bundlingPath");

  const apiKey = process.env.API_KEY;

  if (!apiPath || !apiKey) {
    throw Error("Bundling API params not configured");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 600000);

  try {
    const payload = (await req.json()) as DownloadExecutablePayload;

    const externalApiResponse = await fetch(apiPath, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    const { readable, writable } = new TransformStream();

    if (!externalApiResponse.body) {
      return new Response(null, {
        status: 500,
      });
    }

    externalApiResponse.body.pipeTo(writable);

    return new Response(readable, {
      status: externalApiResponse.status,
      headers: {
        "Content-Type":
          externalApiResponse.headers.get("Content-Type") ||
          "application/octet-stream",
        "Content-Disposition":
          externalApiResponse.headers.get("Content-Disposition") ||
          'attachment; filename="file.exe"',
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Fetch request timed out");
    }

    return NextResponse.json(
      { message: "Error fetching the file", error: error.message },
      { status: 500 }
    );
  }
}
