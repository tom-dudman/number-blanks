import { PDFDownloadLink } from "@react-pdf/renderer";
import { Eye, EyeOff, FileDown, RefreshCcwDot } from "lucide-react";
import { useState } from "react";

import Background from "@/components/Background.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import NumberBlank from "@/problems/NumberBlank/NumberBlank.tsx";
import NumberBlankPdf from "@/problems/NumberBlank/NumberBlankPdf.tsx";
import { OPERATION } from "@/problems/NumberBlank/OPERATION.ts";
import OperationIcon from "@/problems/NumberBlank/OperationIcon.tsx";

function App() {
  const [reveal, setReveal] = useState(false);

  const [modes, setModes] = useState<OPERATION[]>([]);

  const [renderKey, setRenderKey] = useState(0);

  const triggerNewProblem = () => {
    setReveal(false);
    setRenderKey((prev) => prev + 1);
  };

  const toggleMode = (mode: OPERATION) => (active: boolean) => {
    setModes((prevModes) =>
      active
        ? [...prevModes, mode]
        : prevModes.filter((currentMode) => currentMode !== mode),
    );
  };

  const mode = modes.at(~~(modes.length * Math.random()));

  const key = renderKey + (mode ?? "");

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

        <Card className={"w-fit mx-auto px-8 py-12 overflow-hidden"}>
          <CardHeader>
            <CardTitle>Example Problem</CardTitle>
            <CardDescription>Solve this quick problem</CardDescription>
          </CardHeader>
          <CardContent
            className={"flex flex-col justify-between items-center gap-8"}
          >
            <div className={"w-full flex justify-around items-center gap-2"}>
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
            </div>
            <NumberBlank key={"nb-" + key} {...{ mode, reveal }} />
          </CardContent>
        </Card>
        <Button variant={"ghost"} asChild>
          <PDFDownloadLink
            key={"pdf-" + modes.join()}
            document={<NumberBlankPdf modes={modes} />}
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
