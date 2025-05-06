export type AngleMeasureProblem = {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  arcStartX: number;
  arcStartY: number;
  arcEndX: number;
  arcEndY: number;
  arcFlag: 0 | 1;

  labelX: number;
  labelY: number;
};

export const SIZE = 200;
const RADIUS = SIZE / 2;
export const CENTER = SIZE / 2;
export const ARC_RADIUS = RADIUS / 2;

const toRadians = (deg: number) => (deg * Math.PI) / 180;

const createAngleMeasureProblem = (targetAngle: number) => {
  const angle = isFinite(targetAngle)
    ? Math.max(1, Math.min(360, ~~targetAngle))
    : 90;

  const baseAngle = ~~(360 * Math.random());

  const endAngle = baseAngle + angle;

  const x1 = CENTER + RADIUS * Math.cos(toRadians(baseAngle));
  const y1 = CENTER - RADIUS * Math.sin(toRadians(baseAngle));
  const x2 = CENTER + RADIUS * Math.cos(toRadians(endAngle));
  const y2 = CENTER - RADIUS * Math.sin(toRadians(endAngle));

  const arcFlag = angle > 180 ? 1 : 0;
  const arcStartX = CENTER + ARC_RADIUS * Math.cos(toRadians(baseAngle));
  const arcStartY = CENTER - ARC_RADIUS * Math.sin(toRadians(baseAngle));
  const arcEndX = CENTER + ARC_RADIUS * Math.cos(toRadians(endAngle));
  const arcEndY = CENTER - ARC_RADIUS * Math.sin(toRadians(endAngle));

  const labelAngle = baseAngle + angle / 2;
  const labelX = CENTER + (ARC_RADIUS + 10) * Math.cos(toRadians(labelAngle));
  const labelY = CENTER - (ARC_RADIUS + 10) * Math.sin(toRadians(labelAngle));

  return {
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
  };
};

export default createAngleMeasureProblem;
