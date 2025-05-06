import React, { useRef } from "react";

import createAngleMeasureProblem, {
  ARC_RADIUS,
  CENTER,
  SIZE,
} from "@/routes/angle-measure/AngleMeasureProblem.ts";

type AngleProblemProps = {
  angle: number;
  reveal?: boolean;
};

const AngleMeasure: React.FC<AngleProblemProps> = ({
  angle,
  reveal = false,
}) => {
  const angleProblem = useRef(createAngleMeasureProblem(angle));
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
  } = angleProblem.current;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      className={"animate-in zoom-in duration-300"}
    >
      <line
        x1={CENTER}
        y1={CENTER}
        x2={x1}
        y2={y1}
        stroke={"black"}
        strokeWidth={2}
      />
      <line
        x1={CENTER}
        y1={CENTER}
        x2={x2}
        y2={y2}
        stroke={"black"}
        strokeWidth={2}
      />
      <path
        d={`M ${arcStartX} ${arcStartY}
            A ${ARC_RADIUS} ${ARC_RADIUS} 0 ${arcFlag} 0 ${arcEndX} ${arcEndY}`}
        fill={"none"}
        stroke={"black"}
        strokeDasharray={"2"}
        strokeWidth={1.5}
      />
      {reveal && (
        <text
          x={labelX}
          y={labelY}
          fontSize={"12"}
          fill={"black"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
        >
          {Math.round(angle)}°
        </text>
      )}
    </svg>
  );
};

export default AngleMeasure;
