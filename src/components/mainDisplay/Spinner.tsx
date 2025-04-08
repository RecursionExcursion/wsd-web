"use client";

import { useEffect, useState } from "react";
import { useSpinner } from "../../hooks/UseSpinner";

type ConnectingToBackEndAnimationProps = {
  type: "init" | "building" | "none";
};

export const SpinnerAnimationAndText = (
  props: ConnectingToBackEndAnimationProps
) => {
  const initText = "Connecting to backend";
  const buildingText = "Building";

  const spinner = useSpinner();

  const [text, setText] = useState(
    props.type === "init" ? initText : buildingText
  );

  const isNone = props.type == "none";

  useEffect(() => {
    if (!isNone) {
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
    }
  }, [isNone]);

  return isNone ? (
    <>{spinner}</>
  ) : (
    <div>
      {spinner}
      {text}
    </div>
  );
};
