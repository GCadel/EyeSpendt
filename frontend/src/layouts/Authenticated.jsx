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
        <div className='min-h-screen flex flex-col bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-900'>
          <header className='sticky top-0 z-50 border-b border-white/5 bg-slate-900/20 backdrop-blur-md p-5'>
            <nav className='max-w-7xl mx-auto flex justify-between items-center'>
              <div className='text-xl font-bold tracking-tight text-emerald-400'>
                <span>EyeSpendt</span>
              </div>
              <button
                onClick={handleLogout}
                className='px-4 py-2 text-sm font-medium text-slate-300 hover:text-rose-400 hover:bg-rose-400/10 border border-transparent hover:border-rose-400/20 rounded-lg transition-all active:scale-95'
              >
                Logout
              </button>
            </nav>
          </header>
          <main className='grow flex flex-col items-center justify-center px-6'>
            <Outlet />
          </main>
        </div>
      </AuthContext>
    );
};
