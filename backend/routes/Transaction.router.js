const express = require("express");
const {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransaction,
} = require("../controllers/Transaction.controller");

const router = express.Router();

router.route("/").get(getTransactions).post(createTransaction);
router
  .route("/:id")
  .delete(deleteTransaction)
  .put(updateTransaction)
  .get(getTransaction);

module.exports = router;
