import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";

interface AppState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  reveal: boolean;
  setReveal: (reveal: boolean) => void;
  toggleReveal: () => void;
}

const useAppState = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: "system",
        setTheme: (theme) => set({ theme }),
        toggleTheme: () =>
          get().setTheme(get().theme === "dark" ? "light" : "dark"),
        loading: false,
        setLoading: (loading) => set({ loading }),
        reveal: false,
        setReveal: (reveal) => set({ reveal }),
        toggleReveal: () => set(({ reveal }) => ({ reveal: !reveal })),
      }),
      {
        name: "app-settings",
        partialize: ({ theme }) => ({ theme }),
      },
    ),
  ),
);

export default useAppState;
