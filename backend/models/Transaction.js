const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["needs", "wants", "savings"],
      default: "wants",
    },
    description: {
      type: String,
      required: [true, "Please provide a short description of the transaction"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount for the transaction"],
    },
    transactionDate: {
      type: Date,
      required: [true, "Please provide a date for the transaction occurrence"],
      default: Date.now(),
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", TransactionSchema);
