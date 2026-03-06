const { NotFound } = require("../errors");
const Transaction = require("../models/Transaction");
const { StatusCodes } = require("http-status-codes");

const getTransactions = async (req, res) => {
  const transactions = await Transaction.find({
    createdBy: req.user.id,
  }).sort("transactionDate");
  return res.status(StatusCodes.OK).json({ transactions });
};

const getTransaction = async (req, res) => {
  const { id: _id } = req.params;
  const transaction = await Transaction.findOne({
    _id,
    createdBy: req.user.id,
  });
  if (!transaction) {
    throw new NotFound("Transaction not found");
  }
  return res.status(StatusCodes.OK).json({ transaction });
};

const updateTransaction = async (req, res) => {
  const {
    params: { id: _id },
    body,
    user: { id: userId },
  } = req;

  const transaction = await Transaction.findOneAndUpdate(
    {
      _id,
      createdBy: userId,
    },
    body,
    { runValidators: true, new: true },
  );

  if (!transaction) {
    throw new NotFound("Transaction does not exist");
  }

  return res.status(StatusCodes.ACCEPTED).json({ transaction });
};

const createTransaction = async (req, res) => {
  const transaction = await Transaction.create({
    ...req.body,
    createdBy: req.user.id,
  });
  return res.status(StatusCodes.CREATED).json({ transaction });
};

const deleteTransaction = async (req, res) => {
  const { id: _id } = req.params;
  const transaction = await Transaction.findOneAndDelete({
    _id,
    createdBy: req.user.id,
  });

  if (!transaction) {
    throw new NotFound("Could not find transaction");
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
