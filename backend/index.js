require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./database/connect");
const TransactionRouter = require("./routes/Transaction.router");
const AuthRouter = require("./routes/auth.router");
const AuthMiddleware = require("./middleware/authentication");

const app = express();

app.use(express.json());

// Security Packages
app.use(require("express-rate-limit")({ windowMs: 15 * 60 * 1000, max: 100 }));
app.set("trust proxy", 1);
app.use(require("helmet")());
app.use(require("cors")());
app.use(require("xss-clean")());

// Routes
app.use("/api/transactions", AuthMiddleware, TransactionRouter);
app.use("/api/auth", AuthRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello from Spendt!" });
});

// Error handling middleware
app.use(require("./middleware/not-found"));
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
