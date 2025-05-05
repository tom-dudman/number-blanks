import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { PropsWithChildren } from "react";

import { Problem } from "@/routes/number-blank/Problem.ts";

const CHAR_DIMENSIONS = 30;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
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
    height: CHAR_DIMENSIONS,
    columnGap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  answerRow: {
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  char: {
    width: CHAR_DIMENSIONS,
    color: "black",
    textAlign: "center",
  },
  blankChar: {
    height: CHAR_DIMENSIONS,
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
const NumberBlanksPdfProblem = ({
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
    <View style={styles.problemGrid} wrap={false}>
      <View style={styles.problemRow}>{topRow}</View>
      <View style={styles.problemRow}>{bottomRow}</View>
      <View style={[styles.problemRow, styles.answerRow]}>{answerRow}</View>
    </View>
  );
};

export default NumberBlanksPdfProblem;
