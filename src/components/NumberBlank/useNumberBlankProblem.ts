import { useRef } from "react";

import { OPERATION } from "./OPERATION.ts";
import { chooseOperation, Problem, problemFactory } from "./Problem.ts";

const randomOffset = () => Math.round(Math.random()) as 1 | 0;

const useNumberBlankProblem = (mode?: OPERATION): [Problem, 1 | 0] => {
  const problem = useRef(problemFactory[chooseOperation(mode)]());

  const offset = useRef(randomOffset());

  return [problem.current, offset.current];
};

export default useNumberBlankProblem;
