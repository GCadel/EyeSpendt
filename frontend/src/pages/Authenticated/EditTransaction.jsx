import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getTransactionData } from "../../functions/transactionData";
import { AuthContext } from "../../AuthContext";
import { EditTransactionForm } from "../../components/Forms/EditTransactionForm";

export const EditTransaction = () => {
  const { transactionID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const url = `${import.meta.env.VITE_TRANSACTION}/${transactionID}`;

  useEffect(() => {
    if (loading) {
      const getTransaction = async () => {
        const { data, errors } = await getTransactionData(url, token);
        if (!errors) {
          setData({ ...data.transaction });
        }
        setLoading(false);
      };

      getTransaction();
    }
  }, [loading]);

  if (loading) {
    return (
      <div>
        <h2>Loading transaction...</h2>
      </div>
    );
  }
  if (data) {
    return (
      <div className='w-full max-w-md p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Editing Transaction
          </h1>
          <p className='text-slate-400'>Transaction ID: {transactionID}</p>
        </div>
        <EditTransactionForm
          data={data}
          url={url}
        />
      </div>
    );
  }
  return (
    <div className='w-full max-w-md p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-white mb-8'>
          Transaction not found
        </h1>
        <Link
          to={"/dashboard"}
          className='w-full sm:w-1/3  text-center text-slate-400 hover:text-white bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700 rounded-lg transition-all font-medium text-sm px-4 py-2'
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};
