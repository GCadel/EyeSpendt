const express = require("express");
const connectDB = require("./database/connect");
const TransactionRouter = require("./routes/Transaction.router");

const app = express();

app.use(express.json());

app.use("/api/transactions", TransactionRouter);

app.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({ msg: "Hello from Spendt!" });
});
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error connecting to DB:", error.message);
  }
};

start();
