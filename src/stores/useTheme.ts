import { useEffect } from "react";

import useAppState, { Theme } from "@/stores/useAppState.ts";

const determineTheme = (theme: Theme) => {
  if (theme === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  return theme;
};

const alterMarkupTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  root.classList.add(determineTheme(theme));
};

const useTheme = () => {
  const theme = useAppState(({ theme }) => theme);
  const { setTheme, toggleTheme } = useAppState.getState();

  useEffect(() => {
    alterMarkupTheme(theme);
  }, [theme]);

  const actualTheme = determineTheme(theme);

  const svgStroke = actualTheme === "dark" ? "white" : "black";

  return { theme, actualTheme, svgStroke, setTheme, toggleTheme };
};

export default useTheme;
