"use client";

import { useEffect, useState } from "react";
import LocalStorageService, {
  LocalStorageKey,
  LS_Deployable,
} from "../../service/localStorageService";
import { iconServer } from "../../assets/icons";
import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import Button from "../base/Button";
import { uppercaseFirstLetter } from "../../lib/util";

type DeployableMenuProps = {
  type: LocalStorageKey;
};

export default function DeployableMenu(props: DeployableMenuProps) {
  const [items, setItems] = useState(LocalStorageService.get(props.type));

  useEffect(() => {
    const refreshContent = () => {
      setItems(LocalStorageService.get(props.type));
    };

    emitter.on(eventKeys.updateSideBar, refreshContent);

    return () => {
      emitter.off(eventKeys.updateSideBar, refreshContent);
    };
  }, [props.type]);

  const title = (() => {
    const l = items.length;
    switch (props.type) {
      case "saved":
        return `SAVED (${l})`;
      case "last":
        return `LAST (${l})`;
    }
  })();

  return (
    <div className="flex flex-col justify-center text-center">
      <h2>{title}</h2>
      {items.map((item, i) => (
        <ItemDisplay key={item.timestamp + i} item={item} type={props.type} />
      ))}
    </div>
  );
}

type ItemDisplayProps = {
  item: LS_Deployable;
  type: LocalStorageKey;
};

const iconSize = 30;

const ItemDisplay = (props: ItemDisplayProps) => {
  const { item, type } = props;

  const [showProcesses, setShowProccesses] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <button
          className="underline"
          onClick={() => {
            emitter.emit(eventKeys.updateDeployable, { content: item });
          }}
        >
          Use
        </button>
        <span>Created: {new Date(item.timestamp).toLocaleDateString()}</span>
        <button onClick={() => setShowProccesses(!showProcesses)}>
          {showProcesses
            ? iconServer({ iconKey: "cheveronUp", size: iconSize })
            : iconServer({ iconKey: "cheveronDown", size: iconSize })}
        </button>
      </div>
      {showProcesses && (
        <>
          <div className="flex flex-col px-2">
           {item.name && <span>{item.name}</span>}
            <span>OS: {item.os}</span>
            {item.processes.map((p, i) => {
              return (
                <span
                  className="text-ellipsis text-nowrap overflow-x-hidden"
                  key={i + p.type + p.arg}
                >
                  {uppercaseFirstLetter(p.type)}: {p.arg}
                </span>
              );
            })}
          </div>
          {type === "saved" && (
            <Button
              style={{
                color: "#ee3939",
              }}
              onClick={() => {
                LocalStorageService.remove(type, item.id);
                emitter.emit(eventKeys.updateSideBar);
              }}
              styleKey="none"
            >
              {iconServer({ iconKey: "trashCan", size: 24 })}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
