import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getTransactionData } from "../../functions/transactionData";
import { AuthContext } from "../../AuthContext";
import { EditTransactionForm } from "../../components/Forms/EditTransactionForm";

export const EditTransaction = () => {
  const { transactionID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const url = `${import.meta.env.VITE_TRANSACTION}/${transactionID}`;

  useEffect(() => {
    if (loading) {
      const getTransaction = async () => {
        const { data, errors } = await getTransactionData(url, token);
        if (!errors) {
          setData({ ...data.transaction });
        }
        setLoading(false);
      };

      getTransaction();
    }
  }, [loading]);

  if (loading) {
    return (
      <div>
        <h2>Loading transaction...</h2>
      </div>
    );
  }
  if (data) {
    return (
      <div>
        <h2>Editing Transaction</h2>
        <EditTransactionForm
          data={data}
          url={url}
        />
        <Link to={"/dashboard"}>Cancel</Link>
      </div>
    );
  }
  return (
    <div>
      <h2>Transaction not found</h2>
      <Link to={"/dashboard"}>Back to dashboard</Link>
    </div>
  );
};
