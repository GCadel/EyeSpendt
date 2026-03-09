import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import {
  deleteTransaction,
  getTransactionData,
} from "../../functions/transactionData";
import { TransactionItem } from "../../components/TransactionItem";
import { Link } from "react-router";

export const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toBeDeleted, setToBeDeleted] = useState(null);

  const url = "http://localhost:3001/api/transactions";

  useEffect(() => {
    if (loading) {
      const getTransactions = async () => {
        const res = await getTransactionData(url, token);
        const { data, err } = res;
        if (!data) {
          setTransactions([]);
        } else {
          setTransactions([...data.transactions]);
        }
        setLoading(false);
      };
      getTransactions();
    }
  }, [loading]);

  useEffect(() => {
    if (toBeDeleted) {
      const removeTransaction = async () => {
        await deleteTransaction(url.concat(`/${toBeDeleted}`), token);

        setLoading(true);
        setToBeDeleted(null);
      };
      removeTransaction();
    }
  }, [toBeDeleted]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back, {user.name}</p>
      <Link to={"/createTransaction"}>➕ New Transaction</Link>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <TransactionItem
                data={transaction}
                reloadHandler={setToBeDeleted}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};
