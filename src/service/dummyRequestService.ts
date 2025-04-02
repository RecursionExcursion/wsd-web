// import { Process } from "../types/process";
// import { DDWsdPayload } from "./downloadService";

// export async function sendDummy() {
//   const ddPayload: DDWsdPayload = {
//     name: "dummy",
//     arch: "win64",
//     commands: ([{ type: "path", arg: "www.facebook.com" }] as Process[]).map(
//       (p) => {
//         const prefix = p.type === "cmd" ? "cmd:" : "url:";

//         let arg = p.arg;
//         if (p.type === "cmd") {
//           arg = arg.replaceAll("\\", "/");
//         }

//         return prefix + arg;
//       }
//     ),
//   };

//   const res = await fetch("/api/download", {
//     method: "POST",
//     body: JSON.stringify(ddPayload),
//     cache: "no-store",
//   });

//   console.log("res", res);
// }
