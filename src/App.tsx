import "./App.css";

import { useCallback, useEffect, useState } from "react";

type Operation = (a: number, b: number) => number;

enum MODE {
  PLUS = "+",
  SUBTRACT = "-",
}

const OPERATIONS: { [key in MODE]: Operation } = {
  [MODE.PLUS]: (a, b) => a + b,
  [MODE.SUBTRACT]: (a, b) => a - b,
};

const OperationKeys = Object.keys(OPERATIONS) as MODE[];

function App() {
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);

  const [reveal, setReveal] = useState(false);

  const [mode, setMode] = useState<MODE | undefined>();

  const [operation, setOperation] = useState(MODE.PLUS);

  const createSubtractProblem = () => {
    const newTop = Math.floor(10_000 * Math.random());

    let newBottom = 9999;
    while (newBottom >= newTop) {
      newBottom = newBottom = Math.floor(10_000 * Math.random());
    }

    setOperation(MODE.SUBTRACT);
    setTop(newTop);
    setBottom(newBottom);
  };

  const createAdditionProblem = () => {
    const newTop = Math.floor(10_000 * Math.random());

    let newBottom = 9999;

    while (newTop + newBottom >= 10_000) {
      newBottom = Math.floor(10_000 * Math.random());
    }

    setOperation(MODE.PLUS);
    setTop(newTop);
    setBottom(newBottom);
  };

  const createNewProblem = useCallback((chosenMode?: MODE) => {
    switch (chosenMode) {
      case MODE.PLUS:
        createAdditionProblem();
        break;
      case MODE.SUBTRACT:
        createSubtractProblem();
        break;
      case undefined:
        createNewProblem(
          OperationKeys.at(~~(OperationKeys.length * Math.random())),
        );
        break;
      default:
        chosenMode satisfies never;
        break;
    }
    setReveal(false);
  }, []);

  const switchMode = (newMode?: MODE) => () => {
    setMode(newMode);
  };

  useEffect(() => {
    createNewProblem(mode);
  }, [createNewProblem, mode]);

  const answer =
    operation in OPERATIONS ? OPERATIONS[operation](top, bottom) : 0;

  const [t1, t2, t3, t4] = top.toString().padStart(4, "0").split("");

  const [b1, b2, b3, b4] = bottom.toString().padStart(4, "0").split("");

  const splitAnswer = answer.toString().padStart(4, "0").split("");

  const hideChar = (char: string) => (reveal ? char : " ");

  const offset = Math.round(Math.random());

  const topWithBlanks = [t1, t2, t3, t4].map((char, index) =>
    offset === index % 2 ? hideChar(char) : char,
  );
  const bottomWithBlanks = [b1, b2, b3, b4].map((char, index) =>
    offset === index % 2 ? char : hideChar(char),
  );

  return (
    <>
      <h1>Number Blanks</h1>
      <div className="card">
        <div>
          <button
            onClick={() => {
              createNewProblem(mode);
            }}
          >
            New Problem
          </button>
          <button
            onClick={() => {
              setReveal((prev) => !prev);
            }}
          >
            {reveal ? "Hide" : "Reveal"}
          </button>
        </div>
        <div id="modes">
          {OperationKeys.map((buttonMode) => (
            <button
              key={buttonMode}
              onClick={switchMode(buttonMode)}
              className={buttonMode === mode ? "active" : ""}
            >
              {buttonMode}
            </button>
          ))}
          <button onClick={switchMode()} className={mode ? "" : "active"}>
            Either
          </button>
        </div>
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
      </div>
    </>
  );
}

export default App;
