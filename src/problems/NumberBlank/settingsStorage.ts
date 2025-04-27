import { OPERATION } from "@/problems/NumberBlank/OPERATION.ts";
import {
  MAX_DIFFICULTY,
  MIN_DIFFICULTY,
} from "@/problems/NumberBlank/Problem.ts";

export interface NumberBlankSettings {
  modes: OPERATION[];
  difficulty: number;
}

const defaultSettings: NumberBlankSettings = {
  modes: [OPERATION.PLUS, OPERATION.SUBTRACT, OPERATION.MULTIPLICATION],
  difficulty: MIN_DIFFICULTY + ~~((MAX_DIFFICULTY - MIN_DIFFICULTY) / 2),
};

const storageKey = "settings";

const availableOperations = Object.values(OPERATION) as OPERATION[];

export const loadSettings = (): NumberBlankSettings => {
  try {
    const storedSettings = localStorage.getItem(storageKey);

    if (!storedSettings) return defaultSettings;

    const settings = JSON.parse(storedSettings);

    const modes: OPERATION[] = Array.isArray(settings.modes)
      ? settings.modes.filter((mode: OPERATION) =>
          availableOperations.includes(mode),
        )
      : defaultSettings.modes;

    const settingsDifficulty = Number(settings.difficulty);

    const difficulty = isFinite(settingsDifficulty)
      ? Math.min(MAX_DIFFICULTY, Math.max(MIN_DIFFICULTY, settingsDifficulty))
      : defaultSettings.difficulty;

    return { modes, difficulty };
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = (settings: NumberBlankSettings) => {
  localStorage.setItem(storageKey, JSON.stringify(settings));
};
