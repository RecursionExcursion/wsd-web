import { emitter } from "../lib/events/EventEmittor";
import { eventKeys } from "../lib/events/events";

export const pollApiStatus = async () => {
  const pollFreq = 5000;

  const poll = setInterval(async () => {
    console.log("Polling API");
    const res = await fetch("/api/status");

    if (res.ok) {
      console.log("API response received");
      const isReady = await res.json();

      if (isReady) {
        emitter.emit(eventKeys.backendReady, { content: isReady });
        clearInterval(poll);
      }
    }
  }, pollFreq);
};
