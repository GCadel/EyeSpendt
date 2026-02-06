const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const minEmailLen = 3;

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid Email",
    ],
    minLength: [
      minEmailLen,
      `Email must be at least ${minEmailLen} characters long`,
    ],
  },
  password: {
    type: String,
  },
  monthlyBudget: {
    type: Number,
    min: 0,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getMonthlyBudget = function () {
  return this.monthlyBudget;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: `${this.firstname} ${this.lastname} `,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN },
  );
};

UserSchema.methods.checkPassword = async function (password) {
  const passIsCorrect = await bcrypt.compare(password, this.password);
  return passIsCorrect;
};

module.exports = mongoose.model("User", UserSchema);
