import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { OPERATION } from "@/routes/number-blank/OPERATION.ts";
import OperationIcon from "@/routes/number-blank/OperationIcon.tsx";
import useAppState from "@/stores/useAppState.ts";
import useNumberBlankStore from "@/stores/useNumberBlankStore.ts";

const ModeToggles = () => {
  const { modes, toggleMode } = useNumberBlankStore.getState();

  const loading = useAppState(({ loading }) => loading);
  const setReveal = useAppState(({ setReveal }) => setReveal);

  const handleToggleMode = (mode: OPERATION) => () => {
    toggleMode(mode);
    setReveal(false);
  };

  return (
    <div className={"flex justify-around gap-8"}>
      {[
        Object.values(OPERATION).map((operationOption) => {
          const id = "oo-" + operationOption;
          const checked = modes.includes(operationOption);
          return (
            <div key={id} className="flex items-center space-x-1">
              <Label htmlFor={id}>
                <OperationIcon operation={operationOption} />
              </Label>
              <Switch
                id={id}
                checked={checked}
                onCheckedChange={handleToggleMode(operationOption)}
                disabled={loading || (checked && modes.length === 1)}
              ></Switch>
            </div>
          );
        }),
      ]}
    </div>
  );
};

export default ModeToggles;
