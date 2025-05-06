import { describe, expect, it } from "vitest";

import { createAngle } from "@/routes/angle-measure/useAngle.ts";

const NUMBER_OF_SAMPLES = 10;

describe("It produces an angle within range and correct precision", () => {
  it("Produces and angle within range and with a precision of 1", () => {
    const angles = Array(NUMBER_OF_SAMPLES)
      .fill(0)
      .map(() => createAngle());
    expect(angles.every((angle) => angle <= 360)).toEqual(true);
    expect(angles.every((angle) => angle >= 1)).toEqual(true);
    expect(angles.some((angle) => angle % 1)).toEqual(false);
  });

  it("Produces and angle within range and with a precision of 5", () => {
    const angles = Array(NUMBER_OF_SAMPLES)
      .fill(0)
      .map(() => createAngle(5));
    expect(angles.every((angle) => angle <= 360)).toEqual(true);
    expect(angles.every((angle) => angle >= 1)).toEqual(true);
    expect(angles.some((angle) => angle % 5)).toEqual(false);
  });

  it("Produces and angle within range and with a precision of 10", () => {
    const angles = Array(NUMBER_OF_SAMPLES)
      .fill(0)
      .map(() => createAngle(10));
    expect(angles.every((angle) => angle <= 360)).toEqual(true);
    expect(angles.every((angle) => angle >= 1)).toEqual(true);
    expect(angles.some((angle) => angle % 10)).toEqual(false);
  });

  it("Handles negative precision by using the absolute value", () => {
    const angles = Array(NUMBER_OF_SAMPLES)
      .fill(0)
      .map(() => createAngle(-10));
    expect(angles.every((angle) => angle <= 360)).toEqual(true);
    expect(angles.every((angle) => angle >= 1)).toEqual(true);
    expect(angles.some((angle) => angle % 10)).toEqual(false);
  });

  it("It uses the modulo of angles above 360", () => {
    const angles = Array(NUMBER_OF_SAMPLES)
      .fill(0)
      .map(() => createAngle(380));
    expect(angles.every((angle) => angle <= 360)).toEqual(true);
    expect(angles.every((angle) => angle >= 1)).toEqual(true);
    expect(angles.some((angle) => angle % 20)).toEqual(false);
  });

  it("It falls back to a precision of 1 for non-finite values", () => {
    const angles = Array(NUMBER_OF_SAMPLES)
      .fill(0)
      .map(() => createAngle(Infinity));
    expect(angles.every((angle) => angle <= 360)).toEqual(true);
    expect(angles.every((angle) => angle >= 1)).toEqual(true);
    expect(angles.some((angle) => angle % 1)).toEqual(false);
  });

  it("It falls back to a precision of 1 for NaN values", () => {
    const angles = Array(NUMBER_OF_SAMPLES)
      .fill(0)
      .map(() => createAngle(NaN));
    expect(angles.every((angle) => angle <= 360)).toEqual(true);
    expect(angles.every((angle) => angle >= 1)).toEqual(true);
    expect(angles.some((angle) => angle % 1)).toEqual(false);
  });
});
