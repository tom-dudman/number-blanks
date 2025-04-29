import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button.tsx";
import useAppState from "@/stores/useAppState.ts";

const RevealToggleButton = () => {
  const { reveal, toggleReveal } = useAppState.getState();

  return (
    <Button onClick={toggleReveal} variant={"outline"} className={"w-1/2"}>
      {reveal ? <EyeOff /> : <Eye />}
    </Button>
  );
};

export default RevealToggleButton;
