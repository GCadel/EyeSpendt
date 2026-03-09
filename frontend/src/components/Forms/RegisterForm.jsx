import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { FormErrorDisplay } from "../FormErrorDisplay";
import { submitFormData } from "../../functions/submitFormData";
import { useNavigate } from "react-router";

const url = import.meta.env.VITE_REGISTER;

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confPassword: "",
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
    if (fields.password === fields.confPassword) {
      setLoading(true);
    } else {
      setSubmitErrors([{ msg: "Passwords do not match", field: "Password" }]);
    }
  };

  const handleFormUpdate = (fieldValue) => {
    setFields({ ...fields, ...fieldValue });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormErrorDisplay errorList={submitErrors} />
      <InputField
        fieldName={"firstname"}
        fieldType={"text"}
        fieldLabel={"First name"}
        fieldValue={fields.firstname}
        required
        onChange={(e) => handleFormUpdate({ firstname: e.target.value })}
      />
      <InputField
        fieldName={"lastname"}
        fieldType={"text"}
        fieldLabel={"Last name"}
        fieldValue={fields.lastname}
        onChange={(e) => handleFormUpdate({ lastname: e.target.value })}
      />
      <InputField
        fieldName={"email"}
        fieldType={"email"}
        fieldLabel={"Email Address"}
        fieldValue={fields.email}
        required
        onChange={(e) => handleFormUpdate({ email: e.target.value })}
      />
      <InputField
        fieldName={"password"}
        fieldType={"password"}
        fieldLabel={"Password"}
        fieldValue={fields.password}
        required
        onChange={(e) => handleFormUpdate({ password: e.target.value })}
      />
      <InputField
        fieldName={"confPassword"}
        fieldType={"password"}
        fieldLabel={"Confirm Password"}
        fieldValue={fields.confPassword}
        required
        onChange={(e) => handleFormUpdate({ confPassword: e.target.value })}
      />
      <button disabled={loading}>Create Account</button>
    </form>
  );
};
