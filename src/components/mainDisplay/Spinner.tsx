"use client";

import { useEffect, useState } from "react";
import { useSpinner } from "../../hooks/UseSpinner";

type ConnectingToBackEndAnimationProps = {
  type: "init" | "building";
};

export const SpinnerAnimationAndText = (props: ConnectingToBackEndAnimationProps) => {
  const initText = "Connecting to backend";
  const buildingText = "Building";

  const spinner = useSpinner();

  const [text, setText] = useState(
    props.type === "init" ? initText : buildingText
  );

  useEffect(() => {
    const inter = setInterval(() => {
      setText((prev) => {
        if (prev.endsWith("...")) {
          return prev.slice(0, -3);
        } else {
          return prev + ".";
        }
      });
    }, 500);

    return () => clearInterval(inter);
  }, []);

  return (
    <div>
      {spinner}
      {text}
    </div>
  );
};
