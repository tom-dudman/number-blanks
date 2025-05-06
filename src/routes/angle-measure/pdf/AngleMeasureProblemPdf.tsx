import { Line, Path, Svg, Text } from "@react-pdf/renderer";
import React from "react";

import createAngleMeasureProblem, {
  ARC_RADIUS,
  CENTER,
  SIZE,
} from "@/routes/angle-measure/AngleMeasureProblem.ts";

type AngleProblemPDFProps = {
  angle: number;
  reveal?: boolean;
};

const printSize = 0.75 * SIZE;

const AngleProblemPDF: React.FC<AngleProblemPDFProps> = ({
  angle,
  reveal = false,
}) => {
  const {
    x1,
    y1,
    x2,
    y2,
    arcStartX,
    arcStartY,
    arcEndX,
    arcEndY,
    arcFlag,
    labelX,
    labelY,
  } = createAngleMeasureProblem(angle);

  return (
    <Svg
      preserveAspectRatio={"xMidYMid"}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={printSize}
      height={printSize}
    >
      <Line
        x1={CENTER}
        y1={CENTER}
        x2={x1}
        y2={y1}
        stroke={"black"}
        strokeWidth={1}
      />
      <Line
        x1={CENTER}
        y1={CENTER}
        x2={x2}
        y2={y2}
        stroke={"black"}
        strokeWidth={1}
      />
      <Path
        d={`M ${arcStartX} ${arcStartY}
             A ${ARC_RADIUS} ${ARC_RADIUS} 0 ${arcFlag} 0 ${arcEndX} ${arcEndY}`}
        strokeDasharray={"2"}
        stroke={"black"}
        strokeWidth={1}
        fill={"none"}
      />
      {reveal && (
        <Text x={labelX} y={labelY} fill={"black"}>
          {Math.round(angle)}°
        </Text>
      )}
    </Svg>
  );
};

export default AngleProblemPDF;
