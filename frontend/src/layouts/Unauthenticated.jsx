import { Outlet } from "react-router";

export const Unauthenticated = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-900'>
      <header className='sticky top-0 z-50 border-b border-white/5 bg-slate-900/20 backdrop-blur-md p-5'>
        <nav className='max-w-7xl mx-auto flex justify-between items-center'>
          <div className='text-xl font-bold tracking-tight text-emerald-400'>
            <span>EyeSpendt</span>
          </div>
        </nav>
      </header>
      <main className='grow flex flex-col items-center justify-center px-6'>
        <Outlet />
      </main>
    </div>
  );
};
