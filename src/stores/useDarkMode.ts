import { useEffect } from "react";

import useAppState, { Theme } from "@/stores/useAppState.ts";

const alterMarkupTheme = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  const systemTheme = (() => {
    if (theme !== "system") return theme;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
    return "light";
  })() satisfies Theme;

  root.classList.add(systemTheme);
};

const useDarkMode = () => {
  const theme = useAppState(({ theme }) => theme);
  const { setTheme, toggleTheme } = useAppState.getState();

  useEffect(() => {
    alterMarkupTheme(theme);
  }, [theme]);

  return { theme, setTheme, toggleTheme };
};

export default useDarkMode;
