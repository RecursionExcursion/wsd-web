import { Process } from "../types/process";

export const createProcess = (): Process => {
  return {
    type: "path",
    arg: "",
  };
};
