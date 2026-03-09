import { Link, useParams } from "react-router";

export const EditTransaction = () => {
  const { transactionID } = useParams();
  return (
    <div>
      <h2>Editing {transactionID}</h2>
      <Link to={"/dashboard"}>Cancel</Link>
    </div>
  );
};
