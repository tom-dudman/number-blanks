import { useState } from "react";

const useRenderKey = (): [number, () => void] => {
  const [renderKey, setRenderKey] = useState(Math.random());

  const refreshRenderKey = () => {
    setRenderKey(Math.random());
  };

  return [renderKey, refreshRenderKey];
};

export default useRenderKey;
