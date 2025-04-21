import { PDFDownloadLink } from "@react-pdf/renderer";
import { Eye, EyeOff, FileDown, RefreshCcwDot } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import NumberBlank from "@/problems/NumberBlank/NumberBlank.tsx";
import NumberBlankPdf from "@/problems/NumberBlank/NumberBlankPdf.tsx";
import { OPERATION } from "@/problems/NumberBlank/OPERATION.ts";
import OperationIcon from "@/problems/NumberBlank/OperationIcon.tsx";

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
    <div
      className={"w-full h-screen flex flex-col justify-around items-center"}
    >
      <div className="text-center">
        <h1 className={"text-3xl"}>Number Blank</h1>
        <p className={"italic text-gray-600"}>Fill in the missing numbers.</p>
        <ToggleGroup
          type={"multiple"}
          size={"lg"}
          value={[mode ?? "Shuffle"]}
          className={"mx-auto mt-2"}
        >
          {[
            Object.values(OPERATION).map((operationOption) => (
              <ToggleGroupItem
                key={"oo-" + operationOption}
                value={operationOption}
                onClick={switchMode(operationOption)}
              >
                <OperationIcon operation={operationOption} />
              </ToggleGroupItem>
            )),
            <ToggleGroupItem
              key={"oo-"}
              value={"Shuffle"}
              onClick={switchMode()}
            >
              <OperationIcon />
            </ToggleGroupItem>,
          ]}
        </ToggleGroup>
      </div>
      <div>
        <Card className={"w-fit mx-auto px-8 py-12"}>
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
      </div>
      <Button variant={"ghost"} asChild>
        <PDFDownloadLink
          key={"pdf-" + key + (reveal && "+")}
          document={<NumberBlankPdf mode={mode} />}
          fileName={"NumberBlank.pdf"}
        >
          <FileDown /> Download Worksheet
        </PDFDownloadLink>
      </Button>
    </div>
  );
}

export default App;
