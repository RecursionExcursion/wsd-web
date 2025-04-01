"use server";

import { loadEnvVar } from "./externalAPIService";

// Hits base route to trigger cold start
export async function wakeupApi() {
  await fetch(await loadEnvVar("API_BASE"));
}
