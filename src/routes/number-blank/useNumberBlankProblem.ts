import { useRef } from "react";

import {
  createProblem,
  NumberBlankProblem,
  ProblemParameters,
} from "./NumberBlankProblem.ts";

const useNumberBlankProblem = (
  params?: ProblemParameters,
): NumberBlankProblem => {
  const problem = useRef(createProblem(params));

  return problem.current;
};

export default useNumberBlankProblem;
