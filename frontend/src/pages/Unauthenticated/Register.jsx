import { Link } from "react-router";
import { RegisterForm } from "../../components/Forms/RegisterForm";

export const Register = () => {
  return (
    <div className='w-full max-w-md p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>Register Today!</h1>
        <p className='text-slate-400'>Start tracking your transactions</p>
      </div>

      <RegisterForm />
      <div className='mt-8 text-center text-sm text-slate-400'>
        Already have an account?{" "}
        <Link
          to={"/login"}
          className='text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline-offset-4 hover:underline'
        >
          Login
        </Link>
      </div>
    </div>
  );
};
