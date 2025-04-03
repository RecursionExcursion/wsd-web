"use client";

import { ReactNode, useState } from "react";

export function useApiConnectionWatcher() {
  const [isConnected, setIsConnected] = useState(false);

  function connect(fn: () => Promise<void>) {
    fn().then(() => setIsConnected(true));
  }

  function ConnectionStatus(): ReactNode {
    return (
      <div className="flex justify-center items-center gap-2"
      >
        Connection status:
        <div className="rounded-full h-4 w-4"
          style={{
            backgroundColor: isConnected ? "green" : "red",
          }}
        ></div>
      </div>
    );
  }

  return { isConnected, connect, ConnectionStatus };
}
