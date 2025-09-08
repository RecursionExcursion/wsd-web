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

  function deleteAllItems() {
    items?.forEach((i) => {
      LocalStorageService.remove(props.type, i.id);
    });
    emitter.emit(eventKeys.updateSideBar);
  }

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
      <span className="flex justify-between gap-2 items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <TrashCanButton onClick={deleteAllItems} />
      </span>
      <div className="flex flex-col gap-2">
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
    <div className="bg-nebula-purple hover:bg-aurora-pink rounded-md border-white border-1">
      <div className="hover:cursor-pointer flex items-center justify-between gap-3">
        <button
          className="text-lg ml-4 hover:text-starlight-yellow cursor-pointer hover:underline"
          onClick={() => {
            emitter.emit(eventKeys.updateDeployable, { content: item });
          }}
        >
          Use {item.name}
        </button>
        <button className="hover:cursor-pointer flex items-center gap-2 flex-row flex-1 justify-end" onClick={() => setShowProccesses(!showProcesses)}>
          <span>Created: {new Date(item.timestamp).toLocaleDateString()}</span>
          {showProcesses
            ? iconServer({ iconKey: "cheveronUp", size: iconSize })
            : iconServer({ iconKey: "cheveronDown", size: iconSize })}
        </button>
      </div>
      {showProcesses && (
        <div className="flex flex-col justify-between md:flex-row items-center bg-cosmic-black px-8">
          <div className="flex flex-col text-start pb-4">
            <span>OS: {item.os}</span>
            {item.args.map((p, i) => {
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
      className="hover:text-aurora-pink rounded-full h-fit px-4 py-2 shadow-lg"
      {...props}
    >
      {iconServer({ iconKey: "trashCan", size: 24 })}
    </button>
  );
};
