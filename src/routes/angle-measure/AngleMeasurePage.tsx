import { RefreshCcwDot } from "lucide-react";

import DownloadButton from "@/components/DownloadButton.tsx";
import RevealToggleButton from "@/components/RevealToggleButton.tsx";
import TitleWithSubtitle from "@/components/TitleWithSubtitle.tsx";
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
import AngleMeasure from "@/routes/angle-measure/AngleMeasure.tsx";
import AngleMeasurePdf from "@/routes/angle-measure/pdf/AngleMeasurePdf.tsx";
import useAngle from "@/routes/angle-measure/useAngle.ts";
import useAppState from "@/stores/useAppState.ts";

const AngleMeasurePage = () => {
  const reveal = useAppState(({ reveal }) => reveal);
  const setReveal = useAppState(({ setReveal }) => setReveal);

  const [angle, changeAngle] = useAngle(10);

  const [renderKey, refreshRenderKey] = useRenderKey();

  const handleChangeAngle = () => {
    setReveal(false);
    refreshRenderKey();
    changeAngle();
  };

  return (
    <>
      <TitleWithSubtitle
        title={"Number Blanks"}
        subtitle={"Measure the angle between the lines."}
      />
      <Card className={"min-w-[346px] mx-auto px-8 py-12 overflow-hidden"}>
        <CardHeader>
          <CardTitle>Example Problem</CardTitle>
          <CardDescription>
            This is what a question will look like
          </CardDescription>
        </CardHeader>
        <CardContent
          className={"flex flex-col justify-between items-center gap-8"}
        >
          <AngleMeasure
            key={[angle, renderKey].join()}
            angle={angle}
            reveal={reveal}
          />
        </CardContent>
        <CardFooter className={"w-full flex justify-around items-center gap-2"}>
          <Button
            onClick={handleChangeAngle}
            variant={"outline"}
            className={"w-1/2"}
          >
            <RefreshCcwDot />
          </Button>
          <RevealToggleButton />
        </CardFooter>
      </Card>
      <DownloadButton Element={AngleMeasurePdf} problemType={"AngleMeasure"} />
    </>
  );
};

export default AngleMeasurePage;
