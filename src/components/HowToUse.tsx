import { iconServer } from "../assets/icons";

type HowToUseModalProps = {
  closeFn: () => void;
};

const spanStyle = "flex text-nowrap gap-3";

export function HowToUseModal(props: HowToUseModalProps) {
  const size = 30;

  const createIcon = iconServer({ iconKey: "pencil", size });
  const downloadIcon = iconServer({ iconKey: "download", size });
  const runIcon = iconServer({ iconKey: "play", size });

  return (
    <div className="flex flex-col bg-red-500 p-2 gap-2 rounded-lg">
      <div className="w-full flex justify-end px-2">
        <button onClick={() => props.closeFn()} className="cursor-pointer">
          X
        </button>
      </div>
      <span className={spanStyle}>
        {createIcon} Create your Deployable. By adding processes. The can be
        file paths or terminal commands
      </span>
      <span className={spanStyle}>
        {downloadIcon} {`Click 'Create' and download the executable`}
      </span>
      <span className={spanStyle}>{runIcon} Deploy!</span>
    </div>
  );
}
