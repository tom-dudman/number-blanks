import "./App.css";

import { useCallback, useEffect, useState } from "react";

const PLUS = "+";
const SUBTRACT = "-";
const EITHER = "Either";

const OPERATIONS = {
  [PLUS]: (a, b) => a + b,
  [SUBTRACT]: (a, b) => a - b,
};

const MODES = [...Object.keys(OPERATIONS), EITHER];

function App() {
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);

  const [reveal, setReveal] = useState(false);

  const [mode, setMode] = useState(EITHER);

  const [operation, setOperation] = useState(PLUS);

  const createSubtractProblem = () => {
    const newTop = Math.floor(10_000 * Math.random());

    let newBottom = 9999;
    while (newBottom >= newTop) {
      newBottom = newBottom = Math.floor(10_000 * Math.random());
    }

    setOperation(SUBTRACT);
    setTop(newTop);
    setBottom(newBottom);
  };

  const createAdditionProblem = () => {
    const newTop = Math.floor(10_000 * Math.random());

    let newBottom = 9999;

    while (newTop + newBottom >= 10_000) {
      newBottom = Math.floor(10_000 * Math.random());
    }

    setOperation(PLUS);
    setTop(newTop);
    setBottom(newBottom);
  };

  const createNewProblem = useCallback((chosenMode) => {
    switch (chosenMode) {
      case PLUS:
        createAdditionProblem();
        break;
      case SUBTRACT:
        createSubtractProblem();
        break;
      default:
        createNewProblem(
          MODES.at(Math.floor((MODES.length - 1) * Math.random())),
        );
        break;
    }
    setReveal(false);
  }, []);

  const switchMode = (newMode) => () => {
    setMode(newMode);
  };

  useEffect(() => {
    createNewProblem(mode);
  }, [createNewProblem, mode]);

  const validOperation = Object.keys(OPERATIONS).includes(operation);

  const answer = validOperation ? OPERATIONS[operation](top, bottom) : 0;

  const [t1, t2, t3, t4] = top.toString().padStart(4, "0").split("");

  const [b1, b2, b3, b4] = bottom.toString().padStart(4, "0").split("");

  const splitAnswer = answer.toString().padStart(4, "0").split("");

  const hideChar = (char) => (reveal ? char : " ");

  const topWithBlanks = [hideChar(t1), t2, hideChar(t3), t4];
  const bottomWithBlanks = [b1, hideChar(b2), b3, hideChar(b4)];

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
          {MODES.map((buttonMode) => (
            <button
              key={buttonMode}
              onClick={switchMode(buttonMode)}
              className={buttonMode === mode ? "active" : ""}
            >
              {buttonMode}
            </button>
          ))}
        </div>
        <div className={"grid"}>
          {[
            ...[null, ...topWithBlanks],
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
