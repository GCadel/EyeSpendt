import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import {
  deleteTransaction,
  getTransactionData,
} from "../../functions/transactionData";
import { TransactionItem } from "../../components/TransactionItem";
import { Link } from "react-router";

export const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toBeDeleted, setToBeDeleted] = useState(null);

  const url = import.meta.env.VITE_TRANSACTION;

  useEffect(() => {
    if (loading) {
      const getTransactions = async () => {
        const res = await getTransactionData(url, token);
        const { data, err } = res;
        if (!data) {
          setTransactions([]);
        } else {
          setTransactions([...data.transactions]);
        }
        setLoading(false);
      };
      getTransactions();
    }
  }, [loading]);

  useEffect(() => {
    if (toBeDeleted) {
      const removeTransaction = async () => {
        await deleteTransaction(url.concat(`/${toBeDeleted}`), token);

        setLoading(true);
        setToBeDeleted(null);
      };
      removeTransaction();
    }
  }, [toBeDeleted]);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto space-y-8'>
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Dashboard</h1>
          <p className='text-slate-400'>Welcome back, {user.name}</p>
        </div>
        <Link
          to='/createTransaction'
          className='flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10'
        >
          <span className='text-xl'>+</span> New Transaction
        </Link>
      </div>
      <section>
        <h2 className='text-xl font-semibold text-slate-200 mb-4'>
          Your Transactions
        </h2>

        {transactions.length > 0 ? (
          <div className='grid gap-3'>
            {transactions.map((transaction) => (
              <TransactionItem
                data={transaction}
                key={transaction._id}
                reloadHandler={setToBeDeleted}
              />
            ))}
          </div>
        ) : (
          <div className='text-center p-12 bg-slate-900/20 rounded-2xl border border-dashed border-slate-700'>
            <p className='text-slate-500'>No transactions found</p>
          </div>
        )}
      </section>
    </div>
  );
};
