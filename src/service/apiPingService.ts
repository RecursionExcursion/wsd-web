"use server";

import { loadEnvVar } from "./externalAPIService";
import { getApiRoute } from "./getRoutesService";

// Hits base route to trigger cold start
export async function wakeupApi() {
  await fetch(await loadEnvVar("API_BASE"));
}
/* Builds and caches cross compilation binaries in Go for faster
 * first build time after container spin up
 */
// export async function warmUpApi() {
//   await fetch(await getApiRoute("getWarmUp"));
// }

// export async function isWarmedUp() {
//   const res = await fetch(await getApiRoute("getStatus"));
//   return (await res.json()) as boolean;
// }
