"use server";

import { NextResponse } from "next/server";
import { loadEnvVar } from "./externalAPIService";

let initalized = false;
const routeMap = new Map<string, string>();

export async function initRoutes() {
  const res = await getRoutes();
  if (!res.ok) {
    throw Error("API routes could not be found");
  }

  const routes = await res.json();

  const baseUrl = await loadEnvVar("API_BASE");

  Object.entries(routes).forEach(([k, v]) => routeMap.set(k, baseUrl + v));

  initalized = true;
}

export async function getApiRoute(routeKey: string) {
  if (!initalized) {
    await initRoutes();
  }

  const route = routeMap.get(routeKey);

  if (!route) {
    throw Error(`Route ${routeKey} is not initalized`);
  }

  return route;
}

async function getRoutes() {
  const apiBase = await loadEnvVar("API_BASE");
  const apiPath = await loadEnvVar("API_ROUTES");
  const apiKey = process.env.API_KEY;

  if (!apiPath || !apiKey) {
    throw Error("Bundling API params not configured");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 100000);

  try {
    const res = await fetch(apiBase + apiPath, {
      method: "GET",
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "AbortError") {
      NextResponse.json(
        { message: "Reponse timed out", error: error.message },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { message: "Error fetching the file", error: error.message },
      { status: 500 }
    );
  }
}
