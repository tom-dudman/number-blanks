import { describe, expect, it } from "vitest";

import { OPERATION } from "./OPERATION.ts";
import { problemFactory } from "./Problem.ts";

describe("Problem produces accurate components to a problem", () => {
  it("Creates an accurate addition problem", () => {
    const [top, operation, bottom, answer] = problemFactory[OPERATION.PLUS]();
    expect(operation).toEqual(OPERATION.PLUS);
    expect(answer).toBeLessThan(10_000);
    expect(top + bottom).toEqual(answer);
  });

  it("Creates an accurate subtraction problem", () => {
    const [top, operation, bottom, answer] =
      problemFactory[OPERATION.SUBTRACT]();
    expect(operation).toEqual(OPERATION.SUBTRACT);
    expect(bottom).toBeLessThanOrEqual(top);
    expect(answer).toBeLessThan(10_000);
    expect(top - bottom).toEqual(answer);
  });

  it("Creates an accurate multiplication problem", () => {
    const [top, operation, bottom, answer] =
      problemFactory[OPERATION.MULTIPLICATION]();
    expect(operation).toEqual(OPERATION.MULTIPLICATION);
    expect(answer).toBeLessThan(10_000);
    expect(top * bottom).toEqual(answer);
  });
});
