import { Document } from "@react-pdf/renderer";

import BrandedPage from "@/pdf/BrandedPage.tsx";
import { ProblemCell, ProblemGrid, ProblemRow } from "@/pdf/ProblemGrid.tsx";
import splitIntoRows from "@/pdf/splitIntoRows.ts";
import AngleMeasureProblemPdf from "@/routes/angle-measure/pdf/AngleMeasureProblemPdf.tsx";
import { createAngle } from "@/routes/angle-measure/useAngle.ts";

const AngleMeasurePdf = () => {
  const problems = Array(8)
    .fill(0)
    .map(() => createAngle());

  const problemRows = splitIntoRows(problems);

  return (
    <Document>
      <BrandedPage size={"A4"}>
        <ProblemGrid>
          {problemRows.map((problemRow) => (
            <ProblemRow key={problemRow.join()}>
              {problemRow.map((angle) => (
                <ProblemCell key={angle}>
                  <AngleMeasureProblemPdf angle={angle} />
                </ProblemCell>
              ))}
            </ProblemRow>
          ))}
        </ProblemGrid>
      </BrandedPage>
      <BrandedPage size={"A4"}>
        <ProblemGrid>
          {problemRows.map((problemRow) => (
            <ProblemRow key={problemRow.join()}>
              {problemRow.map((angle) => (
                <ProblemCell key={angle}>
                  <AngleMeasureProblemPdf angle={angle} reveal />
                </ProblemCell>
              ))}
            </ProblemRow>
          ))}
        </ProblemGrid>
      </BrandedPage>
    </Document>
  );
};

export default AngleMeasurePdf;
