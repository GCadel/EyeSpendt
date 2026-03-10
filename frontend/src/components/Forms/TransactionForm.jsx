import { useContext, useEffect, useState } from "react";
import { FormErrorDisplay } from "../FormErrorDisplay";
import { InputField } from "../InputField";
import { AuthContext } from "../../AuthContext";
import { createTransaction } from "../../functions/transactionData";
import { Link, useNavigate } from "react-router";

export const TransactionForm = () => {
  const [submitErrors, setSubmitErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  // Used to create a compatible date for form input
  const { day, month, year } = Temporal.Now.plainDateTimeISO();
  const createTimeString = (day, month, year) => {
    return `${year}-${Number(month) < 10 ? `0${month}` : month}-${Number(day) < 10 ? `0${day}` : day}`;
  };

  const [fields, setFields] = useState({
    description: "",
    amount: 0,
    category: "wants",
    transactionDate: createTimeString(day, month, year),
  });
  const navigate = useNavigate();

  const url = import.meta.env.VITE_TRANSACTION;

  useEffect(() => {
    if (loading) {
      const sendData = async () => {
        const { errors } = await createTransaction(url, token, fields);
        if (errors) {
          setSubmitErrors(errors);
        } else {
          setSubmitErrors([]);
          navigate("/dashboard");
        }
        setLoading(false);
      };
      sendData();
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const handleChange = (fieldUpdate) => {
    setFields({ ...fields, ...fieldUpdate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormErrorDisplay errorList={submitErrors} />
      <InputField
        fieldLabel={"What's it for?"}
        fieldName={"description"}
        fieldType={"text"}
        fieldValue={fields.description}
        onChange={(e) => {
          handleChange({ description: e.target.value });
        }}
        required
      />
      <InputField
        fieldLabel={"How much was it? ($)"}
        fieldName={"amount"}
        fieldType={"number"}
        fieldValue={fields.amount}
        onChange={(e) => {
          handleChange({ amount: e.target.value });
        }}
        required
      />

      <InputField
        fieldLabel={"When was it?"}
        fieldType={"date"}
        fieldName={"date-select"}
        fieldValue={fields.transactionDate}
        onChange={(e) => handleChange({ transactionDate: e.target.value })}
      />

      <div className='flex flex-col gap-1.5 mb-4 relative'>
        <label
          htmlFor='type-select'
          className='text-sm font-medium text-slate-300'
        >
          What type of transaction is it?
        </label>
        <div className='relative'>
          <select
            name='type-select'
            id='type-select'
            value={fields.category}
            onChange={(e) => {
              handleChange({ category: e.target.value });
            }}
            className='w-full appearance-none px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white transition-all outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer'
          >
            <option
              value='wants'
              className='bg-slate-900 text-white'
            >
              wants
            </option>
            <option
              value='needs'
              className='bg-slate-900 text-white'
            >
              needs
            </option>
            <option
              value='savings'
              className='bg-slate-900 text-white'
            >
              savings
            </option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400'>
            <svg
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-3 mt-8'>
        <Link
          to={"/dashboard"}
          className='w-full sm:w-1/3 py-3 text-center text-slate-400 hover:text-white bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700 rounded-lg transition-all font-medium text-sm'
        >
          Cancel
        </Link>

        <button
          disabled={loading}
          className='w-full sm:flex-grow py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 font-bold rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-emerald-500/20'
        >
          Create Transaction
        </button>
      </div>
    </form>
  );
};
