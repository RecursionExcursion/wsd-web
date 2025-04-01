import { NextResponse } from "next/server";
import { getApiRoute } from "../../../service/getRoutesService";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET() {
  const apiPath = await getApiRoute("getStatus");
  const apiKey = process.env.API_KEY;

  if (!apiPath || !apiKey) {
    throw Error("Bundling API params not configured");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(apiPath, {
      method: "GET",
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    // return res;
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "AbortError") {
      NextResponse.json({ message: "Request timed out" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Error fetching the file", error: error.message },
      { status: 500 }
    );
  }
}
