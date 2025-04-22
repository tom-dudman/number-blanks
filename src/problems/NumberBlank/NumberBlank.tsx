import { clsx } from "clsx";

import { OPERATION } from "./OPERATION.ts";
import useNumberBlankProblem from "./useNumberBlankProblem.ts";

export interface NumberBlankProps {
  mode?: OPERATION;
  reveal: boolean;
}

const NumberBlank = ({ mode, reveal }: NumberBlankProps) => {
  const problem = useNumberBlankProblem(mode);

  const [top, operation, bottom, answer, offset] = problem;

  const [t1, t2, t3, t4] = top.toString().padStart(4, "0").split("");

  const [b1, b2, b3, b4] = bottom.toString().padStart(4, "0").split("");

  const splitAnswer = answer.toString().padStart(4, "0").split("");

  const hideChar = (char: string) => (reveal ? char : " ");

  const topWithBlanks = [t1, t2, t3, t4].map((char, index) =>
    offset === index % 2 ? hideChar(char) : char,
  );
  const bottomWithBlanks = [b1, b2, b3, b4].map((char, index) =>
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
