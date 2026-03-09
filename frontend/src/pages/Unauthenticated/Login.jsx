import { Link } from "react-router";
import { LoginForm } from "../../components/Forms/LoginForm";

export const Login = () => {
  return (
    <div>
      <h2>Welcome Back</h2>
      <p>Please login</p>
      <LoginForm />
      <div>
        Don't have an account? <Link to={"/register"}>Create one today!</Link>
      </div>
    </div>
  );
};
