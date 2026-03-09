import { Link } from "react-router";

export const Welcome = () => {
  return (
    <div>
      <h1>EyeSpendt</h1>
      <p>Your transaction tracker</p>
      <div>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Sign Up</Link>
      </div>
    </div>
  );
};
