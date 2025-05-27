"use client";

import { create } from "zustand";

type BackendState = {
  backendReady: boolean;
  setBackendReady: (ready: boolean) => void;
};

const useBackendStore = create<BackendState>((set) => ({
  backendReady: false,
  setBackendReady: (ready) => set({ backendReady: ready }),
}));

export default useBackendStore;
