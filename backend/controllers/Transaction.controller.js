const Transaction = require("../models/Transaction");
const { StatusCodes } = require("http-status-codes");

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort("transactionDate");
  return res.status(StatusCodes.OK).json({ transactions });
};

const getTransaction = async (req, res) => {
  const { id: _id } = req.params;
  const transaction = await Transaction.findOne({ _id });
  if (!transaction) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Transaction not found" });
  }
  return res.status(StatusCodes.OK).json({ transaction });
};

const updateTransaction = async (req, res) => {
  const {
    params: { id: _id },
    body,
  } = req;

  const transaction = await Transaction.findOneAndUpdate(
    {
      _id,
    },
    body,
    { runValidators: true, new: true },
  );

  if (!transaction) {
    return res
      .status(StatusCodes.IM_A_TEAPOT)
      .json({ msg: "Error updating transaction" });
  }

  return res.status(StatusCodes.ACCEPTED).json({ transaction });
};

const createTransaction = async (req, res) => {
  const transaction = await Transaction.create(req.body);
  return res.status(StatusCodes.CREATED).json({ transaction });
};

const deleteTransaction = async (req, res) => {
  const { id: _id } = req.params;
  const transaction = await Transaction.findOneAndDelete({
    _id,
  });

  if (!transaction) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "No transaction found" });
  }

  return res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: `Transaction ${_id} deleted` });
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
};
