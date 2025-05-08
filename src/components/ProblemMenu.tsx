import {
  Calculator,
  CircleChevronDown,
  DraftingCompass,
  LoaderCircle,
} from "lucide-react";
import { useLocation, useNavigate, useNavigation } from "react-router";

import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

const ProblemMenu = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { state } = useNavigation();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className={"fixed top-[1rem] left-[1rem] z-10 cursor-pointer"}
          disabled={state !== "idle"}
        >
          {state === "idle" ? (
            <CircleChevronDown />
          ) : (
            <LoaderCircle className={"animate-spin"} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"bottom"} align={"start"}>
        <DropdownMenuLabel>Problems</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={pathname} onValueChange={handleNavigate}>
          <DropdownMenuRadioItem value={"/arithmetic"}>
            <Calculator /> Number Blank
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"/angle-measure"}>
            <DraftingCompass /> Angle Measure
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProblemMenu;
