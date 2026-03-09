import { useContext, useEffect, useState } from "react";
import { FormErrorDisplay } from "../FormErrorDisplay";
import { InputField } from "../InputField";
import { AuthContext } from "../../AuthContext";
import { createTransaction } from "../../functions/transactionData";
import { useNavigate } from "react-router";

export const TransactionForm = ({ data = null }) => {
  const [submitErrors, setSubmitErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const createTimeString = (day, month, year) => {
    return `${year}-${Number(month) < 10 ? `0${month}` : month}-${Number(day) < 10 ? `0${day}` : day}`;
  };
  const { day, month, year } = Temporal.Now.plainDateTimeISO();
  const [fields, setFields] = useState({
    description: "",
    amount: 0,
    category: "wants",
    transactionDate: createTimeString(day, month, year),
  });
  const navigate = useNavigate();

  const url = "http://localhost:3001/api/transactions";

  useEffect(() => {
    if (loading) {
      const sendData = async () => {
        const { data, errors } = await createTransaction(url, token, fields);

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

      <p>{fields.transactionDate}</p>
      <input
        type='date'
        name=''
        id=''
        value={fields.transactionDate}
        onChange={(e) => {
          handleChange({
            transactionDate: e.target.value,
          });
        }}
      />

      <button disabled={loading}>Create Transaction</button>
    </form>
  );
};
