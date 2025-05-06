import { Page, PageProps, StyleSheet, Text, View } from "@react-pdf/renderer";
import { PropsWithChildren } from "react";

import Logo from "@/pdf/Logo.tsx";
import { NumberBlankSettings } from "@/stores/useNumberBlankStore.ts";

const styles = StyleSheet.create({
  page: {
    height: "100%",
    padding: 20,
  },
  header: {
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
  },
  body: {
    flexGrow: 1,
    borderTopWidth: 1,
    borderTopColor: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 20,
  },
  footer: {
    flexGrow: 0,
    fontSize: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  branding: {
    rowGap: 10,
  },
  definition: {
    flexDirection: "row",
    columnGap: 10,
  },
  bold: {
    fontWeight: "bold",
  },
});

type NumberBlanksPageProps = PageProps & {
  problem?: NumberBlankSettings;
};

const BrandedPage = ({
  children,
  problem,
  ...props
}: PropsWithChildren<NumberBlanksPageProps>) => (
  <Page {...props} style={styles.page}>
    <View style={styles.header}>
      {problem && (
        <>
          <View style={styles.definition}>
            <Text style={styles.bold}>Difficulty</Text>
            <Text>{problem.difficulty}</Text>
          </View>
          <View style={styles.definition}>
            <Text style={styles.bold}>Problems</Text>
            <Text>{problem.modes.join(" ")}</Text>
          </View>
        </>
      )}
    </View>
    <View style={styles.body} wrap={false}>
      {children}
    </View>
    <View style={styles.footer}>
      <View style={styles.branding}>
        <Logo size={64} />
        <Text>Created using Number Blanks</Text>
      </View>
      <Text>tom-dudman.github.io/number-blanks</Text>
    </View>
  </Page>
);

export default BrandedPage;
