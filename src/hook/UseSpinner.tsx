"use client";

import { JSX, useEffect, useState } from "react";
import AtomizingSquare from "../components/animations/spinners/AtomizingSquare";
import FlippingSquare from "../components/animations/spinners/FlippingSquare";
import FoldingDiamond from "../components/animations/spinners/FoldingDiamond";
import CircleChase from "../components/animations/spinners/CircleChase";
import DoubleBounce from "../components/animations/spinners/DoubleBounce";
import SoundWave from "../components/animations/spinners/SoundWave";
import DancingCubes from "../components/animations/spinners/DancingCubes";
import DancingBalls from "../components/animations/spinners/DancingBalls";

const spinnerRecord: Record<string, JSX.Element> = {
  foldingDiamond: <FoldingDiamond />,
  flippingSquare: <FlippingSquare />,
  atomizingSquare: <AtomizingSquare />,
  circleChase: <CircleChase />,
  doubleBounce: <DoubleBounce />,
  soundWave: <SoundWave />,
  dancingCubes: <DancingCubes />,
  dancingBalls: <DancingBalls />,
};

type UseSpinnerProps = {
  spinner: keyof typeof spinnerRecord;
};

export function useSpinner(props?: UseSpinnerProps) {
  const [spinner, setSpinner] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (props) {
      setSpinner(spinnerRecord[props.spinner]);
    } else {
      const spinners = Array.from(Object.values(spinnerRecord));

      const randomIndex = Math.floor(
        Math.random() * Array.from(Object.values(spinners)).length
      );

      setSpinner(spinners[randomIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return spinner;
}
