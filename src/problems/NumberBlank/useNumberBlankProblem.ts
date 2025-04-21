import { useRef } from "react";

import { OPERATION } from "./OPERATION.ts";
import { chooseOperation, Problem, problemFactory } from "./Problem.ts";

const useNumberBlankProblem = (mode?: OPERATION): Problem => {
  const problem = useRef(problemFactory[chooseOperation(mode)]());

  return problem.current;
};

export default useNumberBlankProblem;
