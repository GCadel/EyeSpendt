import { useContext, useEffect, useState } from "react";
import { FormErrorDisplay } from "../FormErrorDisplay";
import { InputField } from "../InputField";
import { AuthContext } from "../../AuthContext";
import { updateTransaction } from "../../functions/transactionData";
import { useNavigate } from "react-router";

export const EditTransactionForm = ({ data, url }) => {
  const [submitErrors, setSubmitErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const [fields, setFields] = useState({
    ...data,
    transactionDate: String(data.transactionDate).split("T")[0],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const sendData = async () => {
        const { errors } = await updateTransaction(url, token, fields);

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

      <div>
        <label htmlFor='type-select'>What type of transaction is it?</label>
        <br />
        <select
          name='type-select'
          id='type-select'
          value={fields.category}
          onChange={(e) => {
            handleChange({ category: e.target.value });
          }}
        >
          <option value='wants'>wants</option>
          <option value='needs'>needs</option>
          <option value='savings'>savings</option>
        </select>
      </div>

      <button disabled={loading}>Update Transaction</button>
    </form>
  );
};
