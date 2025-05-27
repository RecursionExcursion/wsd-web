"use server";

export async function loadEnvVar(key: string) {
  const envVar = process.env[key];

  if (!envVar) {
    throw Error(`EnvVar ${key} not intialized`);
  }

  return envVar;
}
