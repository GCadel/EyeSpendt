const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const minEmailLen = 3;

// Define the schema
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a name"],
  },
  lastname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide an email address"],
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
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  monthlyBudget: {
    type: Number,
    min: [0, "Monthly budget cannot be less than $0"],
    default: 0,
  },
});

// Method used to hash the parsed password before creating the User document
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Defining methods that can be used on User documents

// Get the user monthly budget
UserSchema.methods.getMonthlyBudget = function () {
  return this.monthlyBudget;
};

// Get the user full name
UserSchema.methods.getFullName = function () {
  return `${this.firstname}${this.lastname ? ` ${this.lastname}` : ""}`;
};

// Create the user JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      monthlyBudget: this.monthlyBudget,
      name: this.getFullName(),
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN },
  );
};

// Verify the user password is correct
UserSchema.methods.checkPassword = async function (password) {
  const passIsCorrect = await bcrypt.compare(password, this.password);
  return passIsCorrect;
};

// Allow the monthly budget to be updated
UserSchema.methods.setBudget = function (newBudget) {
  let updateSuccessful = false;
  try {
    this.monthlyBudget = newBudget > 0 ? newBudget : this.monthlyBudget;
    updateSuccessful = true;
  } catch (error) {
    console.log("Unable to update budget");
  }
  return updateSuccessful;
};

module.exports = mongoose.model("User", UserSchema);
