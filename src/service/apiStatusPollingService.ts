// import { emitter } from "../lib/events/EventEmittor";
// import { eventKeys } from "../lib/events/events";

// /* Check status of backend
//  * Will emit the backendReady event when the backend is ready for requests
//  * It will poll every 5 seconds until then
//  */
// export const warmupAndPoll = async () => {
//   const res = await fetch("/api/status");
//   if (res.ok) {
//     const isReady = await res.json();
//     if (isReady) {
//       console.log(`API is already warmed up`);
//       emitter.emit(eventKeys.backendReady, { content: isReady });
//       return;
//     } else {
//       fetch("/api/warmup");
//     }
//   }

//   const pollFreq = 5000;

//   const poll = setInterval(async () => {
//     console.log("polling...");
//     const res = await fetch("/api/status");

//     if (res.ok) {
//       const isReady = await res.json();
//       console.log("API is ready: ", isReady);

//       if (isReady) {
//         emitter.emit(eventKeys.backendReady, { content: isReady });
//         clearInterval(poll);
//       }
//     }
//   }, pollFreq);
// };
