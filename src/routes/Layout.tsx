import { Outlet } from "react-router";

import Background from "@/components/Background.tsx";
import ThemeMenu from "@/components/ThemeMenu.tsx";

const Layout = () => (
  <div className={"h-dvh z-0"}>
    <Background />
    <ThemeMenu />
    <div
      className={
        "absolute z-9 w-full h-full flex flex-col justify-around items-center"
      }
    >
      <Outlet />
    </div>
  </div>
);

export default Layout;
