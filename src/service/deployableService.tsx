// "use server";

// import { Process } from "../types/process";

// const apiPath = process.env.BUNDLING_API;

// if (!apiPath) {
//   throw Error("Bundling API params not configured");
// }

// const definedPath = apiPath as string;

// export async function createDeployable(processes: Process[]) {
//   console.log(processes);

//   const res = await fetch(definedPath, {
//     method: "GET",
//   })
//     .then((res) => res.text())
//     .then((payload) => console.log(payload))
//     .catch((err) => {
//       console.log(err);
//       console.log("Recovering");
//     });
// }
