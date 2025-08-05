"use client";

import { ChangeEvent } from "react";
import { SUPPORTED_OS } from "../service/browserScriptGen";

type OsRadioProps = {
  setOs: (s: SUPPORTED_OS) => void;
  curr: SUPPORTED_OS;
};

export default function OsRadio(props: OsRadioProps) {
  const { setOs, curr } = props;
  return (
    <div className="flex w-full justify-center gap-5">
      <OsRadioButton
        id="win"
        val="win"
        setOs={setOs}
        checked={curr === "win"}
      />
      <OsRadioButton
        id="mac"
        val="mac"
        setOs={setOs}
        checked={curr === "mac"}
      />
      <OsRadioButton
        id="lin"
        val="lin"
        setOs={setOs}
        checked={curr === "lin"}
      />
    </div>
  );
}

type OsRadioButtonProps = {
  id: string;
  val: SUPPORTED_OS;
  setOs: (s: SUPPORTED_OS) => void;
  checked?: boolean;
};

function OsRadioButton(props: OsRadioButtonProps) {
  const { id, val, setOs, checked = false } = props;
  function handleSelection(e: ChangeEvent<HTMLInputElement>) {
    setOs(e.target.value as SUPPORTED_OS);
  }
  return (
    <div className="flex gap-2">
      <input
        onChange={handleSelection}
        id={id}
        type="radio"
        value={val}
        name="os"
        checked={checked}
      ></input>
      <label htmlFor={id}>{capitalizeFirstLetter(val)}</label>
    </div>
  );
}

function capitalizeFirstLetter(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}
