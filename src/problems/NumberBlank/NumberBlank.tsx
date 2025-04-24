import { clsx } from "clsx";

import { OPERATION } from "./OPERATION.ts";
import useNumberBlankProblem from "./useNumberBlankProblem.ts";

interface NumberBlankProps {
  mode: OPERATION;
  difficulty: number;
  reveal: boolean;
}

const NumberBlank = ({ mode, difficulty, reveal }: NumberBlankProps) => {
  const problem = useNumberBlankProblem({ mode, difficulty });

  const [top, operation, bottom, answer, offset] = problem;

  const splitTop = top.toString().padStart(difficulty, "0").split("");

  const splitBottom = bottom.toString().padStart(difficulty, "0").split("");

  const splitAnswer = answer.toString().padStart(difficulty, "0").split("");

  const hideChar = (char: string) => (reveal ? char : " ");

  const topWithBlanks = splitTop.map((char, index) =>
    offset === index % 2 ? hideChar(char) : char,
  );
  const bottomWithBlanks = splitBottom.map((char, index) =>
    offset === index % 2 ? char : hideChar(char),
  );

  return (
    <div
      className={
        "flex flex-col gap-2 w-fit mx-auto animate-in zoom-in duration-300"
      }
    >
      {[
        [undefined, ...topWithBlanks],
        [operation, ...bottomWithBlanks],
        [undefined, ...splitAnswer],
      ].map((row, index) => (
        <div
          key={index}
          className={clsx(
            "flex gap-2",
            index === 2 && "border-y-1 border-black",
          )}
        >
          {row.map((char, c) => (
            <span
              key={c}
              className={clsx(
                "size-[40px] leading-[40px] text-center",
                char === " " && "border-1 border-black",
              )}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NumberBlank;
