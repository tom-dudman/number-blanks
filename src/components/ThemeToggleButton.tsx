import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import useDarkMode from "@/stores/useDarkMode.ts";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useDarkMode();

  const icon = theme === "light" ? <Moon /> : <Sun />;

  return (
    <Button
      onClick={toggleTheme}
      variant={"ghost"}
      className={"fixed top-[1rem] right-[1rem] z-10 cursor-pointer"}
    >
      {icon}
    </Button>
  );
};

export default ThemeToggleButton;
