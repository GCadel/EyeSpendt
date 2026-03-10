import { Link } from "react-router";
import { LoginForm } from "../../components/Forms/LoginForm";

export const Login = () => {
  return (
    <div className='w-full max-w-md p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
        <p className='text-slate-400'>Please login</p>
      </div>

      <LoginForm />
      <div className='mt-8 text-center text-sm text-slate-400'>
        Don't have an account?{" "}
        <Link
          to={"/register"}
          className='text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline-offset-4 hover:underline'
        >
          Create one today!
        </Link>
      </div>
    </div>
  );
};
