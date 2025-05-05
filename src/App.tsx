import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import NotFound from "@/routes/404.tsx";
import Layout from "@/routes/Layout.tsx";

const NumberBlankPage = React.lazy(() => import("@/routes/number-blank"));

function App() {
  return (
    <BrowserRouter basename={"/number-blanks/"}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={"/"} element={<NumberBlankPage />} />
          <Route path={"*"} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
