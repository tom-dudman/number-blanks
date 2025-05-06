import { useState } from "react";

export const createAngle = (targetPrecision = 1) => {
  const precision = isFinite(targetPrecision)
    ? Math.max(1, Math.min(360, Math.abs(targetPrecision % 360)))
    : 1;
  const multiplier = 360 / precision;
  return ~~Math.max(precision, precision * ~~(multiplier * Math.random()));
};

const useAngle = (precision = 1): [number, () => void] => {
  const [angle, setAngle] = useState(createAngle(precision));

  const changeAngle = () => {
    setAngle(createAngle(precision));
  };

  return [angle, changeAngle];
};

export default useAngle;
