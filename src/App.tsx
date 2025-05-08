import * as React from "react";
import { createHashRouter, Navigate, RouterProvider } from "react-router";

import Layout from "./routes/Layout";

const NumberBlankPage = React.lazy(
  () => import("@/routes/number-blank/NumberBlanksPage.tsx"),
);

const AngleMeasurePage = React.lazy(
  () => import("@/routes/angle-measure/AngleMeasurePage.tsx"),
);

const NotFound = React.lazy(() => import("@/routes/404.tsx"));

const router = createHashRouter([
  {
    Component: Layout,
    children: [
      { path: "/", element: <Navigate replace to={"/arithmetic"} /> },
      { path: "/arithmetic", element: <NumberBlankPage /> },
      { path: "/angle-measure", element: <AngleMeasurePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
