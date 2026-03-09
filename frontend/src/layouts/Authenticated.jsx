import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext";
import { useEffect, useState } from "react";

export const Authenticated = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      if (await JSON.parse(localStorage.getItem("auth"))) {
        setIsAuth(true);
      } else {
        navigate("/login");
      }
    };
    loadToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };
  if (!isAuth) {
    return <></>;
  } else
    return (
      <AuthContext value={JSON.parse(localStorage.getItem("auth"))}>
        <header>
          <h1>EyeSpendt</h1>
          <nav>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </header>
        <Outlet />
      </AuthContext>
    );
};
