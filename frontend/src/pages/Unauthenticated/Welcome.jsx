import { Link } from "react-router";

export const Welcome = () => {
  return (
    <div className='h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-900 flex flex-col items-center justify-center '>
      <h1 className='text-5xl md:text-7xl font-extrabold text-emerald-50 tracking-tight mb-8'>
        EyeSpendt
      </h1>
      <p className='text-lg md:text-xl text-slate-400 mb-10 leading-relaxed'>
        Your transaction tracker
      </p>
      <div className='flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center'>
        <Link
          to={"/login"}
          className='w-full sm:w-auto px-10 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold rounded-xl border border-slate-700 backdrop-blur-sm transition-all active:scale-95'
        >
          Login
        </Link>
        <Link
          to={"/register"}
          className='w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95'
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};
