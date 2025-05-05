import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { scan } from "react-scan";

import App from "./App.tsx";

scan({
  enabled: import.meta.env.DEV,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
