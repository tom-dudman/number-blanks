import { OPERATION } from "./OPERATION.ts";

export type Problem = [number, OPERATION, number, number];

const createMultiplicationProblem = (): Problem => {
  const top = ~~(100 * Math.random());

  let bottom = ~~(100 * Math.random());
  while (top * bottom >= 10_000) bottom = ~~(100 * Math.random());

  const answer = top * bottom;

  return [top, OPERATION.MULTIPLICATION, bottom, answer];
};

const createSubtractProblem = (): Problem => {
  const top = ~~(10_000 * Math.random());

  let bottom = 9999;
  while (bottom >= top) bottom = ~~(10_000 * Math.random());

  const answer = top - bottom;

  return [top, OPERATION.SUBTRACT, bottom, answer];
};

const createAdditionProblem = (): Problem => {
  const top = ~~(10_000 * Math.random());

  let bottom = 9999;

  while (top + bottom >= 10_000) bottom = ~~(10_000 * Math.random());

  const answer = top + bottom;

  return [top, OPERATION.PLUS, bottom, answer];
};

export const problemFactory: { [key in OPERATION]: () => Problem } = {
  [OPERATION.PLUS]: createAdditionProblem,
  [OPERATION.SUBTRACT]: createSubtractProblem,
  [OPERATION.MULTIPLICATION]: createMultiplicationProblem,
};

export const chooseOperation = (mode?: OPERATION) => {
  if (mode) return mode;
  const availableOperations = Object.values(OPERATION);
  const operationIndex = Math.round(
    (availableOperations.length - 1) * Math.random(),
  );
  return availableOperations.at(operationIndex)!;
};
