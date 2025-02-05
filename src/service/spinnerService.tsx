import AtomizingSquare from "../components/animations/spinners/AtomizingSquare";
import FoldingDiamond from "../components/animations/spinners/FoldingDiamond";
import Spinner from "../components/base/Spinner";

const spinners = {
  diamond: <FoldingDiamond />,
  square: <AtomizingSquare />,
  circle: <Spinner />,
};

export function getSpinner(spinner?: keyof typeof spinners) {
  if (spinner) {
    return spinners[spinner];
  }

  const spinnerEntries = Array.from(Object.values(spinners));

  const randomIndex = Math.floor(Math.random() * spinnerEntries.length);

  return spinnerEntries[randomIndex];
}
