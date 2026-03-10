import { TransactionForm } from "../../components/Forms/TransactionForm";

export const CreateTransaction = () => {
  return (
    <div className='w-full max-w-md p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-white mb-2'>New Transaction</h1>
        <p className='text-slate-400'>Where'd your funds go?</p>
      </div>
      <TransactionForm />
    </div>
  );
};
