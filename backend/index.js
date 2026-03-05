const express = require("express");
const connectDB = require("./database/connect");
const TransactionRouter = require("./routes/Transaction.router");
const AuthRouter = require("./routes/auth.router");
const AuthMiddleware = require("./middleware/authentication");

const app = express();

app.use(express.json());

// Routes
app.use("/api/transactions", AuthMiddleware, TransactionRouter);
app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello from Spendt!" });
});

// Error handling middleware
app.use(require("./middleware/error-handler"));

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Attempt to connect to MongoDB
    await connectDB(process.env.MONGO);
    // Listen for connection
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error connecting to DB:", error.message);
  }
};

start();
