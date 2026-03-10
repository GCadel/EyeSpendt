import { Link } from "react-router";

export const TransactionItem = ({ data, reloadHandler }) => {
  const { amount, category, transactionDate, description, _id: id } = data;
  const formatDate = (aDate) => {
    let formattedDate = String(aDate).split("T")[0];
    let [year, month, day] = formattedDate.split("-");
    return `${month}/${day}/${year}`;
  };
  const categoryColors = {
    wants: "text-amber-400 bg-amber-400/10",
    needs: "text-blue-400 bg-blue-400/10",
    savings: "text-emerald-400 bg-emerald-400/10",
  };
  return (
    <div className='group flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl hover:border-white/10 transition-all gap-4'>
      <div className='flex items-center gap-4 w-full sm:w-auto'>
        <div
          className={`hidden sm:flex h-12 w-12 items-center justify-center rounded-full ${categoryColors[category] || "bg-slate-700"}`}
        >
          {/* Subtle icon placeholder based on category */}
          {category === "savings" ? "$" : "•"}
        </div>
        <div>
          <h3 className='text-white font-medium capitalize'>{description}</h3>
          <div className='flex gap-2 items-center mt-1'>
            <span
              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${categoryColors[category]}`}
            >
              {category}
            </span>
            <span className='text-xs text-slate-500'>
              {formatDate(transactionDate)}
            </span>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0'>
        <div className='text-lg font-bold text-white'>
          ${Number(amount).toFixed(2)}
        </div>

        <div className='flex items-center gap-2'>
          <Link
            to={`/editTransaction/${id}`}
            className='p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors'
            title='Edit'
          >
            📝
          </Link>
          <button
            onClick={() => reloadHandler(id)}
            className='p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors'
            title='Delete'
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
