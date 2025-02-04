import { iconServer } from "../assets/icons";
const spanStyle = "flex gap-3 items-center";

export function HowToUseDisplay() {
  const iconSize = 30;

  const pointerIcon = iconServer({ iconKey: "mousePointer", size: iconSize });
  const createIcon = iconServer({ iconKey: "pencil", size: iconSize });
  const downloadIcon = iconServer({ iconKey: "download", size: iconSize });
  const runIcon = iconServer({ iconKey: "play", size: iconSize });

  return (
    <div className="flex flex-grow flex-col py-2.5 px-4 gap-3 rounded-lg border border-black">
      <div className={spanStyle}>
        <div>{pointerIcon}</div>
        <p>Select OS and name your Deployable</p>
      </div>
      <div className={spanStyle}>
        <div>{createIcon}</div>
        <p>
          Create your Deployable by adding processes. File paths or terminal
          commands are allowed.
        </p>
      </div>
      <div className={spanStyle}>
        <div>{downloadIcon}</div>
        <p>{`Click 'Create' and download the executable`}</p>
      </div>
      <div className={spanStyle}>
        <div>{runIcon}</div>
        <p>Deploy!</p>
      </div>
    </div>
  );
}
