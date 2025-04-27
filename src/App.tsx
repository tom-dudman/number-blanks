import { pdf } from "@react-pdf/renderer";
import {
  Eye,
  EyeOff,
  FileDown,
  Gauge,
  LoaderCircle,
  RefreshCcwDot,
} from "lucide-react";
import { useCallback, useState } from "react";

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
import {
  loadSettings,
  saveSettings,
} from "@/problems/NumberBlank/settingsStorage.ts";

const savedSettings = loadSettings();

function App() {
  const [reveal, setReveal] = useState(false);

  const [modes, setModes] = useState(savedSettings.modes);

  const [difficulty, setDifficulty] = useState(savedSettings.difficulty);

  const [renderKey, setRenderKey] = useState(Math.random());

  const triggerNewProblem = () => {
    setReveal(false);
    setRenderKey(Math.random());
  };

  const toggleMode = (mode: OPERATION) => (active: boolean) => {
    const newModes = active
      ? [...modes, mode]
      : modes.filter((currentMode) => currentMode !== mode);
    saveSettings({
      modes: newModes,
      difficulty,
    });
    setModes(newModes);
    setReveal(false);
  };

  const handleCommitDifficulty = ([newDifficulty]: number[]) => {
    saveSettings({
      modes,
      difficulty: newDifficulty,
    });
    setDifficulty(newDifficulty);
    setReveal(false);
  };

  const mode = chooseOperation(modes);

  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    const url = "";
    try {
      const blob = await pdf(
        <NumberBlankPdf
          key={[...modes, difficulty].join()}
          modes={modes}
          difficulty={difficulty}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);

      const response = await fetch(url);
      const blobData = await response.blob();
      const blobUrl = URL.createObjectURL(blobData);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `NumberBlank.pdf`;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error generating PDF");
    } finally {
      if (url) URL.revokeObjectURL(url);
      setLoading(false);
    }
  }, [difficulty, modes]);

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
                      disabled={loading}
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
            disabled={loading}
            onValueCommit={handleCommitDifficulty}
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
              key={[mode, difficulty, renderKey].join()}
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
        <Button
          variant={"ghost"}
          onClick={handleDownload}
          disabled={loading}
          className={"cursor-pointer"}
        >
          {loading ? (
            <>
              <LoaderCircle className={"animate-spin"} /> Downloading...
            </>
          ) : (
            <>
              <FileDown /> Download Worksheet
            </>
          )}
        </Button>
      </div>
    </>
  );
}

export default App;
