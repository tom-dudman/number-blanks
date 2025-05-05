import { Minus, Plus, Shuffle, X } from "lucide-react";

import { OPERATION } from "@/routes/number-blank/OPERATION.ts";

const OperationIcon = ({ operation }: { operation?: OPERATION }) => {
  if (operation === OPERATION.PLUS) return <Plus />;
  if (operation === OPERATION.SUBTRACT) return <Minus />;
  if (operation === OPERATION.MULTIPLICATION) return <X />;
  return <Shuffle />;
};

export default OperationIcon;
