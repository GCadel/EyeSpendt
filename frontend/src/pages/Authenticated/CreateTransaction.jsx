import { Link } from "react-router";
import { TransactionForm } from "../../components/Forms/TransactionForm";

export const CreateTransaction = () => {
  return (
    <div>
      <h2>New Transaction</h2>
      <p>Where'd your funds go?</p>
      <TransactionForm />
      <Link to={"/dashboard"}>Cancel</Link>
    </div>
  );
};
