import { Document } from "@react-pdf/renderer";

import BrandedPage from "@/pdf/BrandedPage.tsx";
import { ProblemCell, ProblemGrid, ProblemRow } from "@/pdf/ProblemGrid.tsx";
import splitIntoRows from "@/pdf/splitIntoRows.ts";
import NumberBlanksPdfProblem from "@/routes/number-blank/pdf/NumberBlanksPdfProblem.tsx";
import { NumberBlankSettings } from "@/stores/useNumberBlankStore.ts";

import { chooseOperation, createProblem } from "../NumberBlankProblem.ts";

const NumberBlanksPdf = (props: NumberBlankSettings) => {
  const { modes, difficulty } = props;

  const problems = Array(8)
    .fill(0)
    .map(() =>
      createProblem({
        mode: chooseOperation(modes),
        difficulty,
      }),
    );

  const problemRows = splitIntoRows(problems);

  return (
    <Document>
      <BrandedPage size={"A4"} problem={props}>
        <ProblemGrid>
          {...problemRows.map((problemRow) => (
            <ProblemRow key={JSON.stringify(problemRow)}>
              {problemRow.map((problem) => (
                <ProblemCell key={JSON.stringify(problem)}>
                  <NumberBlanksPdfProblem
                    problem={problem}
                    difficulty={difficulty}
                  />
                </ProblemCell>
              ))}
            </ProblemRow>
          ))}
        </ProblemGrid>
      </BrandedPage>
      <BrandedPage size={"A4"} problem={props}>
        <ProblemGrid>
          {...problemRows.map((problemRow) => (
            <ProblemRow
              key={JSON.stringify(
                problemRow.map((row) => ({ ...row, reveal: 1 })),
              )}
            >
              {problemRow.map((problem) => (
                <ProblemCell key={JSON.stringify({ ...problem, reveal: true })}>
                  <NumberBlanksPdfProblem
                    reveal
                    problem={problem}
                    difficulty={difficulty}
                  />
                </ProblemCell>
              ))}
            </ProblemRow>
          ))}
        </ProblemGrid>
      </BrandedPage>
    </Document>
  );
};

export default NumberBlanksPdf;
