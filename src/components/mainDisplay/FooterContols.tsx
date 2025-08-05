"use client";

import Button from "../base/Button";

type FooterControlsProps = {
  create: () => void;
  save: () => void;
};

export default function FooterControls(props: FooterControlsProps) {
  return (
    <div className="flex absolute bottom-0 bg-[var(--color-light-secondary)] h-20 w-full justify-center items-center">
      <div className="flex justify-center gap-10 w-full">
        <Button
          className="text-xl disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={props.create}
        >
          Create
        </Button>
        <Button className="text-xl" onClick={props.save}>
          Save
        </Button>
      </div>
    </div>
  );
}
