import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { useNavigate } from "react-router";
import { FormErrorDisplay } from "../FormErrorDisplay";
import { submitFormData } from "../../functions/submitFormData";

const url = import.meta.env.VITE_LOGIN;

export const LoginForm = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [submitErrors, setSubmitErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const sendData = async () => {
        const res = await submitFormData(url, fields);
        const { data, errors } = res;
        if (errors) {
          setSubmitErrors(errors);
        } else {
          setSubmitErrors([]);
          localStorage.setItem("auth", JSON.stringify(data));
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

  return (
    <form onSubmit={handleSubmit}>
      <FormErrorDisplay errorList={submitErrors} />
      <InputField
        fieldName={"email"}
        fieldType={"email"}
        fieldLabel={"Email Address"}
        fieldValue={fields.email}
        required
        onChange={(e) => setFields({ ...fields, email: e.target.value })}
      />
      <InputField
        fieldName={"password"}
        fieldType={"password"}
        fieldLabel={"Password"}
        fieldValue={fields.password}
        required
        onChange={(e) => setFields({ ...fields, password: e.target.value })}
      />
      <button disabled={loading}>Login</button>
    </form>
  );
};
