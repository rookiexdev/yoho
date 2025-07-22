import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* Footer */}
    </>
  );
}
