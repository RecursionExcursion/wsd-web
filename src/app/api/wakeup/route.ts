import { NextResponse } from "next/server";
import { loadEnvVar } from "../../../service/externalAPIService";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pingRes = await fetch(await loadEnvVar("API_BASE"));
    if (pingRes.ok) {
      return new NextResponse(null, { status: 200 });
    } else {
      return new NextResponse(null, { status: 500 });
    }
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
