"use server";

import { getRouteVar } from "./externalAPIService";

export const awakenAPI = async () => {
  const key = process.env.API_KEY;

  if (!key) {
    throw Error("No API key");
  }

  const wakeRoute = await getRouteVar("wakePath");

  fetch(wakeRoute, {
    headers: {
      authorization: `Bearer ${key}`,
    },
    cache: "no-store",
  });
};
