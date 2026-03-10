import { Link } from "react-router";

export const TransactionItem = ({ data, reloadHandler }) => {
  const { amount, category, transactionDate, description, _id: id } = data;
  const formatDate = (aDate) => {
    let formattedDate = String(aDate).split("T")[0];
    let [year, month, day] = formattedDate.split("-");
    return `${month}/${day}/${year}`;
  };
  return (
    <>
      <div>
        <h3>{description}</h3>
        <div>
          <strong>${Number(amount).toFixed(2)}</strong>
        </div>
      </div>
      <div>
        <div>{category}</div>
        <div>{formatDate(transactionDate)}</div>
      </div>
      <button onClick={() => reloadHandler(id)}>🗑️ Delete</button>
      <Link to={`/editTransaction/${id}`}>📝 Edit</Link>
    </>
  );
};
