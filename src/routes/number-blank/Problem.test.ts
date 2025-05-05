import { describe, expect, it } from "vitest";

import { OPERATION } from "./OPERATION.ts";
import { createProblem } from "./Problem.ts";

const difficulty = 4;

describe("Problem produces accurate components to a problem", () => {
  it("Creates an accurate addition problem", () => {
    const [top, operation, bottom, answer] = createProblem({
      mode: OPERATION.PLUS,
      difficulty,
    });
    expect(operation).toEqual(OPERATION.PLUS);
    expect(answer).toBeLessThan(10_000);
    expect(top + bottom).toEqual(answer);
  });

  it("Creates an accurate subtraction problem", () => {
    const [top, operation, bottom, answer] = createProblem({
      mode: OPERATION.SUBTRACT,
      difficulty,
    });
    expect(operation).toEqual(OPERATION.SUBTRACT);
    expect(bottom).toBeLessThanOrEqual(top);
    expect(answer).toBeLessThan(10_000);
    expect(top - bottom).toEqual(answer);
  }, 1_000);

  it("Creates an accurate multiplication problem", () => {
    const [top, operation, bottom, answer] = createProblem({
      mode: OPERATION.MULTIPLICATION,
      difficulty,
    });
    expect(operation).toEqual(OPERATION.MULTIPLICATION);
    expect(answer).toBeLessThan(10_000);
    expect(top * bottom).toEqual(answer);
  });
});
