import { RefreshCcwDot } from "lucide-react";
import { useRef } from "react";

import DownloadButton from "@/components/DownloadButton.tsx";
import RevealToggleButton from "@/components/RevealToggleButton.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import useRenderKey from "@/hooks/useRenderKey.ts";
import DifficultySlider from "@/routes/number-blank/DifficultySlider.tsx";
import ModeToggles from "@/routes/number-blank/ModeToggles.tsx";
import NumberBlank from "@/routes/number-blank/NumberBlank.tsx";
import { chooseOperation } from "@/routes/number-blank/NumberBlankProblem.ts";
import NumberBlanksPdf from "@/routes/number-blank/pdf/NumberBlanksPdf.tsx";
import useAppState from "@/stores/useAppState.ts";
import useNumberBlankStore from "@/stores/useNumberBlankStore.ts";

const NumberBlankPage = () => {
  const modes = useNumberBlankStore(({ modes }) => modes);
  const difficulty = useNumberBlankStore(({ difficulty }) => difficulty);

  const reveal = useAppState(({ reveal }) => reveal);
  const setReveal = useAppState(({ setReveal }) => setReveal);

  const modeRef = useRef(chooseOperation(modes));

  if (!modes.includes(modeRef.current))
    modeRef.current = chooseOperation(modes);

  const [renderKey, refreshRenderKey] = useRenderKey();

  const triggerNewProblem = () => {
    modeRef.current = chooseOperation(modes);
    setReveal(false);
    refreshRenderKey();
  };

  return (
    <>
      <div className="text-center">
        <h1
          className={
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
          }
        >
          Number Blanks
        </h1>
        <p className={"text-sm text-muted-foreground"}>
          Fill in the missing numbers.
        </p>
      </div>
      <div className={"flex flex-col items-center gap-4"}>
        <ModeToggles />
        <DifficultySlider />
      </div>
      <Card className={"min-w-[346px] mx-auto px-8 py-12 overflow-hidden"}>
        <CardHeader>
          <CardTitle>Quick Problem</CardTitle>
          <CardDescription>Try to solve it in your head!</CardDescription>
        </CardHeader>
        <CardContent
          className={"flex flex-col justify-between items-center gap-8"}
        >
          <NumberBlank
            key={[modeRef.current, difficulty, renderKey].join()}
            {...{ mode: modeRef.current, difficulty, reveal }}
          />
        </CardContent>
        <CardFooter className={"w-full flex justify-around items-center gap-2"}>
          <Button
            onClick={triggerNewProblem}
            variant={"outline"}
            className={"w-1/2"}
          >
            <RefreshCcwDot />
          </Button>
          <RevealToggleButton />
        </CardFooter>
      </Card>
      <DownloadButton
        Element={NumberBlanksPdf}
        problemType={"Number Blanks"}
        modes={modes}
        difficulty={difficulty}
      />
    </>
  );
};

export default NumberBlankPage;
