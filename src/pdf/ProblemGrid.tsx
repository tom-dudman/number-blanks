import { StyleSheet, View, ViewProps } from "@react-pdf/renderer";
import { PropsWithChildren } from "react";

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
    flexDirection: "row",
    justifyContent: "center",
  },
});

export const ProblemGrid = ({
  children,
  ...props
}: PropsWithChildren<ViewProps>) => (
  <View style={styles.pageGrid} {...props}>
    {children}
  </View>
);

export const ProblemRow = ({
  children,
  ...props
}: PropsWithChildren<ViewProps>) => (
  <View style={styles.pageRow} {...props}>
    {children}
  </View>
);

export const ProblemCell = ({
  children,
  ...props
}: PropsWithChildren<ViewProps>) => (
  <View style={styles.pageCell} {...props}>
    {children}
  </View>
);
