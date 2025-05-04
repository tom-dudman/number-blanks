import { Document, StyleSheet, View } from "@react-pdf/renderer";

import BrandedPage from "@/pdf/BrandedPage.tsx";
import NumberBlanksPdfProblem from "@/problems/NumberBlank/pdf/NumberBlanksPdfProblem.tsx";
import { NumberBlankSettings } from "@/stores/useNumberBlankStore.ts";

import { chooseOperation, createProblem, Problem } from "../Problem.ts";

const styles = StyleSheet.create({
  pageGrid: {
    flexGrow: 1,
  },
  pageRow: {
    flexGrow: 1,
    flexDirection: "row",
  },
  pageCell: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

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

  const problemRows = problems.reduce<Problem[][]>((acc, problem, index) => {
    if (!(index % 2)) return [...acc, [problem]];
    const [last, ...rest] = acc.reverse();
    return [...rest, [...last, problem]];
  }, []);

  return (
    <Document>
      <BrandedPage size={"A4"} problem={props}>
        <View style={styles.pageGrid}>
          {...problemRows.map((problemRow) => (
            <View key={problemRow.flat().join()} style={styles.pageRow}>
              {problemRow.map((problem) => (
                <View key={problem.join()} style={styles.pageCell}>
                  <NumberBlanksPdfProblem
                    problem={problem}
                    difficulty={difficulty}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </BrandedPage>
      <BrandedPage size={"A4"} problem={props}>
        <View style={styles.pageGrid}>
          {...problemRows.map((problemRow, index) => (
            <View key={"pr" + index} style={styles.pageRow}>
              {problemRow.map((problem, index) => (
                <View key={"p" + index} style={styles.pageCell}>
                  <NumberBlanksPdfProblem
                    reveal
                    problem={problem}
                    difficulty={difficulty}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </BrandedPage>
    </Document>
  );
};

export default NumberBlanksPdf;
