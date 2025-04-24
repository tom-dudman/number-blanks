import { useRef } from "react";

import { createProblem, Problem, ProblemParameters } from "./Problem.ts";

const useNumberBlankProblem = (params?: ProblemParameters): Problem => {
  const problem = useRef(createProblem(params));

  return problem.current;
};

export default useNumberBlankProblem;
