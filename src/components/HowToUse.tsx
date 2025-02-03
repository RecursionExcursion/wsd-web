import { iconServer } from "../assets/icons";

type HowToUseModalProps = {
  closeFn: () => void;
};

const spanStyle = "flex text-nowrap gap-3 items-center";

export function HowToUseModal(props: HowToUseModalProps) {
  const size = 30;

  const pointerIcon = iconServer({ iconKey: "mousePointer", size });
  const createIcon = iconServer({ iconKey: "pencil", size });
  const downloadIcon = iconServer({ iconKey: "download", size });
  const runIcon = iconServer({ iconKey: "play", size });

  return (
    <div className="flex flex-grow flex-col bg-gradient py-2.5 px-4 gap-3 rounded-lg border border-black">
      <div className="w-full flex justify-end px-2">
        <button
          onClick={() => props.closeFn()}
          className="cursor-pointer font-bold text-lg"
        >
          X
        </button>
      </div>
      <span className={spanStyle}>
        {pointerIcon} Select OS and name your Deployable
      </span>
      <span className={spanStyle}>
        {createIcon} Create your Deployable by adding processes. File paths or
        terminal commands are allowed.
      </span>
      <span className={spanStyle}>
        {downloadIcon} {`Click 'Create' and download the executable`}
      </span>
      <span className={spanStyle}>{runIcon} Deploy!</span>
    </div>
  );
}
