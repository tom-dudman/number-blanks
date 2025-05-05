import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { OPERATION } from "@/routes/number-blank/OPERATION.ts";
import {
  MAX_DIFFICULTY,
  MIN_DIFFICULTY,
} from "@/routes/number-blank/Problem.ts";

export interface NumberBlankSettings {
  modes: OPERATION[];
  difficulty: number;
}

type NumberBlanksStore = NumberBlankSettings & {
  setDifficulty: (difficulty: number) => void;
  toggleMode: (mode: OPERATION) => void;
};

const useNumberBlankStore = create<NumberBlanksStore>()(
  devtools(
    persist(
      (set) => ({
        modes: [OPERATION.PLUS, OPERATION.SUBTRACT, OPERATION.MULTIPLICATION],
        difficulty: MIN_DIFFICULTY + ~~((MAX_DIFFICULTY - MIN_DIFFICULTY) / 2),
        setDifficulty: (difficulty) =>
          set({
            difficulty: Math.max(
              MIN_DIFFICULTY,
              Math.min(MAX_DIFFICULTY, difficulty),
            ),
          }),
        toggleMode: (targetMode) =>
          set(({ modes }) => ({
            modes: modes.includes(targetMode)
              ? modes.filter((mode) => mode !== targetMode)
              : [...modes, targetMode],
          })),
      }),
      {
        name: "settings",
      },
    ),
  ),
);

export default useNumberBlankStore;
