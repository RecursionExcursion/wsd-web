import { emitter } from "../lib/events/EventEmittor";
import { eventKeys } from "../lib/events/events";

export const pollApiStatus = async () => {
  const res = await fetch("/api/status");
  if (res.ok) {
    const isReady = await res.json();
    if (isReady) {
        console.log(`API is already warmed up`)
      emitter.emit(eventKeys.backendReady, { content: isReady });
      return;
    }
  }

  const pollFreq = 5000;

  const poll = setInterval(async () => {
    console.log("polling...");
    const res = await fetch("/api/status");

    if (res.ok) {
      const isReady = await res.json();
      console.log("API is ready: ", isReady);

      if (isReady) {
        emitter.emit(eventKeys.backendReady, { content: isReady });
        clearInterval(poll);
      }
    }
  }, pollFreq);
};
