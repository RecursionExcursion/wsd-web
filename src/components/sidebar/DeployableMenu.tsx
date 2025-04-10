"use client";

import { useEffect, useState } from "react";
import LocalStorageService, {
  LocalStorageKey,
  LS_Deployable,
} from "../../service/localStorageService";
import { iconServer } from "../../assets/icons";
import { emitter } from "../../lib/events/EventEmittor";
import { eventKeys } from "../../lib/events/events";
import { uppercaseFirstLetter } from "../../lib/util";

type DeployableMenuProps = {
  type: LocalStorageKey;
};

export default function DeployableMenu(props: DeployableMenuProps) {
  const [items, setItems] = useState<LS_Deployable[]>();

  useEffect(() => {
    setItems(LocalStorageService.get(props.type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const l = items?.length ?? 0;
    switch (props.type) {
      case "saved":
        return `SAVED (${l})`;
      case "last":
        return `LAST (${l})`;
    }
  })();

  return (
    <div className="flex flex-col justify-center text-center gap-2">
      <span className="flex justify-center gap-2">
        <h2>{title}</h2>
        <TrashCanButton
          onClick={() => {
            /* Deletes all items */
            items?.forEach((i) => {
              LocalStorageService.remove(props.type, i.id);
            });
            emitter.emit(eventKeys.updateSideBar);
          }}
        />
      </span>
      <div>
        {items?.map((item, i) => (
          <ItemDisplay key={item.timestamp + i} item={item} type={props.type} />
        ))}
      </div>
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
    <div className="odd:bg-[var(--color-light-secondary)] even:bg-[var(--color-secondary)]">
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
        <div className="bg-[var(--color-lightest-secondary)]">
          <div className="flex flex-col px-2 text-start">
            {item.name && (
              <span className="font-semibold underline">Name: {item.name}</span>
            )}
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
          <TrashCanButton
            onClick={() => {
              LocalStorageService.remove(type, item.id);
              emitter.emit(eventKeys.updateSideBar);
            }}
          />
        </div>
      )}
    </div>
  );
};

type TrashCanProps = React.ComponentPropsWithoutRef<"button"> & {};

const TrashCanButton = (props: TrashCanProps) => {
  return (
    <button
      style={{
        color: "#ee3939",
      }}
      {...props}
    >
      {iconServer({ iconKey: "trashCan", size: 24 })}
    </button>
  );
};
