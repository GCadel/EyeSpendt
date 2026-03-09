import { Link } from "react-router";
import { RegisterForm } from "../../components/Forms/RegisterForm";

export const Register = () => {
  return (
    <div>
      <h2>Register Today!</h2>
      <p>Start tracking your transactions</p>
      <RegisterForm />
      <div>
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};
