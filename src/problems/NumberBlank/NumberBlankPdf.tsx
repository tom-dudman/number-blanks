import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { PropsWithChildren } from "react";

import { NumberBlankSettings } from "@/problems/NumberBlank/settingsStorage.ts";

import { chooseOperation, createProblem, Problem } from "./Problem.ts";

const CHAR_DIMENSIONS = 30;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    flexGrow: 1,
  },
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
  problemGrid: {
    rowGap: 10,
    marginHorizontal: "auto",
  },
  problemRow: {
    columnGap: 10,
    flexDirection: "row",
  },
  answerRow: {
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  char: {
    width: CHAR_DIMENSIONS,
    height: CHAR_DIMENSIONS,
    color: "black",
    textAlign: "center",
  },
  blankChar: {
    borderWidth: 1,
    borderColor: "black",
  },
});

const BlankChar = () => (
  <View style={[styles.char, styles.blankChar]}>{null}</View>
);

const Char = ({ children }: PropsWithChildren) => (
  <Text style={styles.char}>{children}</Text>
);

const NumberBlankProblem = ({
  problem,
  difficulty,
  reveal,
}: {
  problem: Problem;
  difficulty: number;
  reveal?: boolean;
}) => {
  const [top, operation, bottom, answer, offset] = problem;

  const tops = top.toString().padStart(difficulty, "0").split("");

  const bottoms = bottom.toString().padStart(difficulty, "0").split("");

  const splitAnswer = answer.toString().padStart(difficulty, "0").split("");

  const topRow = [
    <Char key={"t-1"}>{null}</Char>,
    tops.map((char, index) => {
      const key = "t" + index;
      if (!reveal && offset === index % 2) return <BlankChar key={key} />;
      return <Char key={key}>{char}</Char>;
    }),
  ];

  const bottomRow = [
    <Char key={"b-1"}>{operation}</Char>,
    bottoms.map((char, index) => {
      const key = "b" + index;
      if (reveal || offset === index % 2) return <Char key={key}>{char}</Char>;
      return <BlankChar key={key} />;
    }),
  ];

  const answerRow = [null, ...splitAnswer].map((char, index) => (
    <Char key={"a" + index}>{char}</Char>
  ));

  return (
    <View style={styles.problemGrid}>
      <View style={styles.problemRow}>{topRow}</View>
      <View style={styles.problemRow}>{bottomRow}</View>
      <View style={[styles.problemRow, styles.answerRow]}>{answerRow}</View>
    </View>
  );
};

const NumberBlankPdf = (props: NumberBlankSettings) => {
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
      <Page size={"A4"} style={styles.page}>
        <View style={styles.pageGrid}>
          {...problemRows.map((problemRow) => (
            <View key={problemRow.flat().join()} style={styles.pageRow}>
              {problemRow.map((problem) => (
                <View key={problem.join()} style={styles.pageCell}>
                  <NumberBlankProblem
                    problem={problem}
                    difficulty={difficulty}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.pageGrid}>
          {...problemRows.map((problemRow, index) => (
            <View key={"pr" + index} style={styles.pageRow}>
              {problemRow.map((problem, index) => (
                <View key={"p" + index} style={styles.pageCell}>
                  <NumberBlankProblem
                    reveal
                    problem={problem}
                    difficulty={difficulty}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default NumberBlankPdf;
