import "./App.css";

import { useState } from "react";

import NumberBlank from "./components/NumberBlank/NumberBlank.tsx";
import { OPERATION } from "./components/NumberBlank/OPERATION.ts";

function App() {
  const [reveal, setReveal] = useState(false);

  const [mode, setMode] = useState<OPERATION | undefined>();

  const [renderKey, setRenderKey] = useState(0);

  const triggerNewProblem = () => {
    setReveal(false);
    setRenderKey((prev) => prev + 1);
  };

  const switchMode = (newMode?: OPERATION) => () => {
    setMode(newMode);
  };

  const key = renderKey + (mode ?? "");

  return (
    <>
      <h1>Number Blanks</h1>
      <div className="card">
        <div>
          <button onClick={triggerNewProblem}>New Problem</button>
          <button
            onClick={() => {
              setReveal((prev) => !prev);
            }}
          >
            {reveal ? "Hide" : "Reveal"}
          </button>
        </div>
        <div id="modes">
          {Object.values(OPERATION).map((buttonMode) => (
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
        <NumberBlank key={key} {...{ mode, reveal }} />
      </div>
    </>
  );
}

export default App;
