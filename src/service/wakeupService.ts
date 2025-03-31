"use server";

import { loadEnvVar } from "./externalAPIService";

export async function wakeupApi() {
  await fetch(await loadEnvVar("API_BASE"));
}
