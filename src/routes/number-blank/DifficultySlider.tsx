import { Gauge } from "lucide-react";

import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import {
  MAX_DIFFICULTY,
  MIN_DIFFICULTY,
} from "@/routes/number-blank/NumberBlankProblem.ts";
import useAppState from "@/stores/useAppState.ts";
import useNumberBlankStore from "@/stores/useNumberBlankStore.ts";

const DifficultySlider = () => {
  const { difficulty, setDifficulty } = useNumberBlankStore.getState();

  const loading = useAppState(({ loading }) => loading);
  const setReveal = useAppState(({ setReveal }) => setReveal);

  const handleCommitDifficulty = ([newDifficulty]: number[]) => {
    setDifficulty(newDifficulty);
    setReveal(false);
  };

  return (
    <>
      <Label>
        <Gauge /> Difficulty
      </Label>
      <Slider
        defaultValue={[difficulty]}
        min={MIN_DIFFICULTY}
        max={MAX_DIFFICULTY}
        disabled={loading}
        onValueCommit={handleCommitDifficulty}
      />
    </>
  );
};

export default DifficultySlider;
