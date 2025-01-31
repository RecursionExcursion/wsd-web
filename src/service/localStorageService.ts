"use client";

import { Process } from "../types/process";

export type LS_Deployable = {
  id: string;
  timestamp: number;
  name: string | undefined;
  os: string;
  processes: Process[];
};

export type DeployableWithoutId = Omit<LS_Deployable, "id">;

export type LocalStorageKey = "saved" | "last";

export default class LocalStorageService {
  private static maxRecentLength = 5;

  static get(key: LocalStorageKey) {
    const itemsJson = localStorage.getItem(key) ?? JSON.stringify([]);
    return this.mapLsItemToDeployable(itemsJson);
  }

  static save(key: LocalStorageKey, deployable: DeployableWithoutId) {
    const itemsJson = localStorage.getItem(key) ?? JSON.stringify([]);
    const items = this.mapLsItemToDeployable(itemsJson);

    items.unshift(this.partialToFullLS_Deployable(deployable));
    if (key === "last") {
      items.splice(this.maxRecentLength);
    }
    this.set(key, items);
  }

  static remove(key: LocalStorageKey, id: string) {
    const itemsJson = localStorage.getItem(key) ?? JSON.stringify([]);
    const items = this.mapLsItemToDeployable(itemsJson);
    const filteredItems = items.filter((item) => item.id !== id);
    this.set(key, filteredItems);
  }

  private static mapLsItemToDeployable = (jsonItems: string) =>
    JSON.parse(jsonItems) as LS_Deployable[];

  private static partialToFullLS_Deployable(
    partial: DeployableWithoutId
  ): LS_Deployable {
    return {
      id: generateUID(),
      ...partial,
    };
  }

  private static set = (key: string, items: LS_Deployable[]) =>
    localStorage.setItem(key, JSON.stringify(items));
}

const generateUID = () => (Math.random() * 1000 + Date.now()).toString(30);
