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

const useDarkMode = () => {
  const theme = useAppState(({ theme }) => theme);
  const { setTheme, toggleTheme } = useAppState.getState();

  useEffect(() => {
    alterMarkupTheme(theme);
  }, [theme]);

  const actualTheme = determineTheme(theme);

  return { theme, actualTheme, setTheme, toggleTheme };
};

export default useDarkMode;
