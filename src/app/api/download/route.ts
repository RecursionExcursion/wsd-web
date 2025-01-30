import { NextRequest, NextResponse } from "next/server";
import { Process } from "../../../types/process";

const apiPath = process.env.BUNDLING_API;
const apiKey = process.env.API_KEY;

if (!apiPath || !apiKey) {
  throw Error("Bundling API params not configured");
}

export async function POST(req: NextRequest) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const processes = (await req.json()) as Process[];

    const processObj = {
      os: "win",
      processes,
    };

    const definedPath = apiPath as string;

    const externalApiResponse = await fetch(definedPath, {
      method: "POST",
      body: JSON.stringify(processObj),
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
      return NextResponse.json({});
    }

    externalApiResponse.body.pipeTo(writable);

    return new Response(readable, {
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
