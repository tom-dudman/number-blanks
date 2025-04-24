import { PDFDownloadLink } from "@react-pdf/renderer";
import { Eye, EyeOff, FileDown, Gauge, RefreshCcwDot } from "lucide-react";
import { useState } from "react";

import Background from "@/components/Background.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import NumberBlank from "@/problems/NumberBlank/NumberBlank.tsx";
import NumberBlankPdf from "@/problems/NumberBlank/NumberBlankPdf.tsx";
import { OPERATION } from "@/problems/NumberBlank/OPERATION.ts";
import OperationIcon from "@/problems/NumberBlank/OperationIcon.tsx";
import {
  chooseOperation,
  MAX_DIFFICULTY,
  MIN_DIFFICULTY,
} from "@/problems/NumberBlank/Problem.ts";

function App() {
  const [reveal, setReveal] = useState(false);

  const [modes, setModes] = useState<OPERATION[]>([]);

  const [difficulty, setDifficulty] = useState(
    MIN_DIFFICULTY + ~~((MAX_DIFFICULTY - MIN_DIFFICULTY) / 2),
  );

  const [renderKey, setRenderKey] = useState(Math.random());

  const triggerNewProblem = () => {
    setReveal(false);
    setRenderKey(Math.random());
  };

  const toggleMode = (mode: OPERATION) => (active: boolean) => {
    setModes((prevModes) =>
      active
        ? [...prevModes, mode]
        : prevModes.filter((currentMode) => currentMode !== mode),
    );
  };

  const mode = chooseOperation(modes);

  return (
    <>
      <Background />
      <div
        className={
          "absolute z-10 w-full h-dvh flex flex-col justify-around items-center"
        }
      >
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
          <div className={"flex justify-around gap-8"}>
            {[
              Object.values(OPERATION).map((operationOption) => {
                const id = "oo-" + operationOption;
                return (
                  <div key={id} className="flex items-center space-x-1">
                    <Label htmlFor={id}>
                      <OperationIcon operation={operationOption} />
                    </Label>
                    <Switch
                      id={id}
                      checked={modes.includes(operationOption)}
                      onCheckedChange={toggleMode(operationOption)}
                    ></Switch>
                  </div>
                );
              }),
            ]}
          </div>
          <Label>
            <Gauge /> Difficulty
          </Label>
          <Slider
            defaultValue={[difficulty]}
            min={MIN_DIFFICULTY}
            max={MAX_DIFFICULTY}
            onValueCommit={([value]) => {
              setDifficulty(value);
            }}
          />
        </div>
        <Card className={"w-fit mx-auto px-8 py-12 overflow-hidden"}>
          <CardHeader>
            <CardTitle>Example Problem</CardTitle>
            <CardDescription>Solve this quick problem</CardDescription>
          </CardHeader>
          <CardContent
            className={"flex flex-col justify-between items-center gap-8"}
          >
            <NumberBlank
              key={[mode, difficulty].join()}
              {...{ mode, difficulty, reveal }}
            />
          </CardContent>
          <CardFooter
            className={"w-full flex justify-around items-center gap-2"}
          >
            <Button
              onClick={triggerNewProblem}
              variant={"outline"}
              className={"w-1/2"}
            >
              <RefreshCcwDot />
            </Button>
            <Button
              onClick={() => {
                setReveal((prev) => !prev);
              }}
              variant={"outline"}
              className={"w-1/2"}
            >
              {reveal ? <EyeOff /> : <Eye />}
            </Button>
          </CardFooter>
        </Card>
        <Button variant={"ghost"} asChild>
          <PDFDownloadLink
            key={[...modes, difficulty, renderKey, reveal].join()}
            document={<NumberBlankPdf modes={modes} difficulty={difficulty} />}
            fileName={"NumberBlank.pdf"}
          >
            <FileDown /> Download Worksheet
          </PDFDownloadLink>
        </Button>
      </div>
    </>
  );
}

export default App;
