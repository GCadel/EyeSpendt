import { Outlet } from "react-router";

export const Unauthenticated = () => {
  return (
    <>
      <header>
        <nav>
          <h1>EyeSpendt</h1>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
