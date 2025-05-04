import { Line, Rect, Svg } from "@react-pdf/renderer";

const MathIcon = ({ size = 64 }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x="0" y="0" width="64" height="64" rx="16" ry="16" fill="#d5f3ff" />

    <Line
      x1="18"
      y1="18"
      x2="18"
      y2="28"
      stroke="black"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <Line
      x1="13"
      y1="23"
      x2="23"
      y2="23"
      stroke="black"
      strokeWidth={4}
      strokeLinecap="round"
    />

    <Line
      x1="43"
      y1="26"
      x2="53"
      y2="26"
      stroke="black"
      strokeWidth={4}
      strokeLinecap="round"
    />

    <Line
      x1="22"
      y1="44"
      x2="42"
      y2="44"
      stroke="black"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <Line
      x1="22"
      y1="50"
      x2="42"
      y2="50"
      stroke="black"
      strokeWidth={4}
      strokeLinecap="round"
    />
  </Svg>
);

export default MathIcon;
