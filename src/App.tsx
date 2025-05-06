import * as React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router";

import Layout from "@/routes/Layout.tsx";

const NumberBlankPage = React.lazy(
  () => import("@/routes/number-blank/NumberBlanksPage.tsx"),
);

const AngleMeasurePage = React.lazy(
  () => import("@/routes/angle-measure/AngleMeasurePage.tsx"),
);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/arithmetic"} element={<NumberBlankPage />} />
          <Route path={"/angle-measure"} element={<AngleMeasurePage />} />
          <Route path={"*"} element={<Navigate replace to={"/arithmetic"} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
