import { Moon, Sun, SunMoon } from "lucide-react";
import { JSX } from "react";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Theme } from "@/stores/useAppState";
import useDarkMode from "@/stores/useDarkMode.ts";

const ThemeMenu = () => {
  const { theme, setTheme } = useDarkMode();

  const themes: Record<Theme, [JSX.Element, string]> = {
    system: [<SunMoon />, "System"],
    light: [<Sun />, "Light"],
    dark: [<Moon />, "Dark"],
  };

  const [icon] = themes[theme];

  const handleValueChange = (theme: string) => {
    if (Object.keys(themes).includes(theme)) setTheme(theme as Theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className={"fixed top-[1rem] right-[1rem] z-10 cursor-pointer"}
        >
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"bottom"} align={"end"}>
        <DropdownMenuRadioGroup value={theme} onValueChange={handleValueChange}>
          {Object.entries(themes).map(([key, value]) => {
            const [icon, text] = value;
            return (
              <DropdownMenuRadioItem key={key} value={key}>
                {icon} {text}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeMenu;
