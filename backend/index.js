const express = require("express");
const connectDB = require("./database/connect");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello from Spendt!" });
});
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO);
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.log("Error connecting to DB:", error.message);
  }
});
