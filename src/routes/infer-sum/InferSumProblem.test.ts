import { describe, expect, it } from "vitest";

import InferSumProblem from "@/routes/infer-sum/InferSumProblem.ts";

describe("Creates a Sum Infer problem with only one possible solution", () => {
  const inferSumProblem = new InferSumProblem();

  it("calculates the correct total", () => {
    const total = Array.from(inferSumProblem.chosenItems).reduce(
      (acc, item) => acc + item.price,
      0,
    );
    expect(total).toEqual(inferSumProblem.total);
  });

  it("chooses a coin which covers the cost", () => {
    expect(inferSumProblem.coin.value).toBeGreaterThanOrEqual(
      inferSumProblem.total,
    );
  });

  it("calculates the correct change", () => {
    expect(inferSumProblem.coin.value - inferSumProblem.total).toEqual(
      inferSumProblem.change,
    );
  });

  it("produces only one possible solution", () => {
    const pairs = inferSumProblem.items.flatMap((item, i) =>
      inferSumProblem.items.slice(i + 1).map((otherItem) => [item, otherItem]),
    );

    const validSolutions = pairs.filter(
      (items) =>
        items.reduce((acc, item) => acc + item.price, 0) ===
        inferSumProblem.total,
    );

    expect(validSolutions).toHaveLength(1);
  });
});
