import { OPERATION } from "./OPERATION.ts";

type Offset = 1 | 0;

export type Problem = [number, OPERATION, number, number, Offset];

export const MIN_DIFFICULTY = 2;
export const MAX_DIFFICULTY = 4;

const randomOffset = () => Math.round(Math.random()) as Offset;

const createMultiplicationProblem = (difficulty: number): Problem => {
  const ceiling = Math.pow(10, difficulty);

  const limit = ~~Math.sqrt(ceiling);

  const top = ~~(limit * Math.random());

  let bottom = ~~(limit * Math.random());
  while (top * bottom >= ceiling) bottom = ~~(limit * Math.random());

  const answer = top * bottom;

  return [top, OPERATION.MULTIPLICATION, bottom, answer, randomOffset()];
};

const createSubtractProblem = (difficulty: number): Problem => {
  const ceiling = Math.pow(10, difficulty);

  const top = ~~(ceiling * Math.random());

  let bottom = ceiling - 1;
  while (bottom >= top) bottom = ~~(ceiling * Math.random());

  const answer = top - bottom;

  return [top, OPERATION.SUBTRACT, bottom, answer, randomOffset()];
};

const createAdditionProblem = (difficulty: number): Problem => {
  const ceiling = Math.pow(10, difficulty);

  const top = ~~(ceiling * Math.random());

  let bottom = ceiling - 1;

  while (top + bottom >= ceiling) bottom = ~~(ceiling * Math.random());

  const answer = top + bottom;

  return [top, OPERATION.PLUS, bottom, answer, randomOffset()];
};

export interface ProblemParameters {
  mode?: OPERATION;
  difficulty?: number;
}

export const createProblem = (params?: ProblemParameters): Problem => {
  const validDifficulty = Math.max(
    MIN_DIFFICULTY,
    Math.min(MAX_DIFFICULTY, params?.difficulty ?? 3),
  );

  const operation = params?.mode ?? chooseOperation();

  switch (operation) {
    case OPERATION.PLUS:
      return createAdditionProblem(validDifficulty);
    case OPERATION.SUBTRACT:
      return createSubtractProblem(validDifficulty);
    case OPERATION.MULTIPLICATION:
      return createMultiplicationProblem(validDifficulty);
    default:
      return operation satisfies never;
  }
};

export const chooseOperation = (modes?: OPERATION[]): OPERATION => {
  const availableOperations = modes ?? Object.values(OPERATION);
  const operationIndex = Math.round(
    (availableOperations.length - 1) * Math.random(),
  );
  return availableOperations.at(operationIndex)!;
};
