import { NextResponse } from "next/server";
import { getRouteVar } from "../../../service/externalAPIService";

export async function GET() {
  const apiPath = await getRouteVar("osPath");
  const apiKey = process.env.API_KEY;

  if (!apiPath || !apiKey) {
    throw Error("Bundling API params not configured");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(apiPath as string, {
      method: "GET",
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
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
