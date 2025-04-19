import { OPERATION } from "./OPERATION.ts";
import useNumberBlankProblem from "./useNumberBlankProblem.ts";

interface NumberBlankProps {
  mode?: OPERATION;
  reveal: boolean;
}

const NumberBlank = ({ mode, reveal }: NumberBlankProps) => {
  const [problem, offset] = useNumberBlankProblem(mode);

  const [top, operation, bottom, answer] = problem;

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
    <div className={"grid"}>
      {[
        ...[undefined, ...topWithBlanks],
        ...[operation, ...bottomWithBlanks],
        ...["=", ...splitAnswer],
      ].map((char, c) => (
        <span key={c} className={char === " " ? "blank" : char}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default NumberBlank;
