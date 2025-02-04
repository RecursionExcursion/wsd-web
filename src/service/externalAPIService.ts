"use server";

const envRoutes = {
  baseRoute: process.env.API_BASE,
};

const envPaths = {
  bundlingPath: process.env.API_BUNDLING,
  osPath: process.env.API_OS,
  wakePath: process.env.API_WAKE,
};

if (
  !envRoutes.baseRoute ||
  !envPaths.bundlingPath ||
  !envPaths.osPath ||
  !envPaths.wakePath
) {
  console.error({
    base: envRoutes.baseRoute,
    bundling: envPaths.bundlingPath,
    os: envPaths.osPath,
    wake: envPaths.wakePath,
  });

  throw Error("API env vars not configured");
}

export async function getRouteVar(key: keyof typeof envPaths) {
  return [envRoutes.baseRoute!, envPaths[key]!].join("/");
}
