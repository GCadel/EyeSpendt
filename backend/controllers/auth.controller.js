const { StatusCodes } = require("http-status-codes");
const { BadRequestError, Unauthenticated } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { name: user.getFullName(), monthlyBudget: user.getMonthlyBudget() },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("Incorrect email or password");
  }
  const passIsCorrect = await user.checkPassword(password);
  if (!passIsCorrect) {
    throw new Unauthenticated("Incorrect email or password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.getFullName(),
      monthlyBudget: user.getMonthlyBudget(),
    },
    token,
  });
};

module.exports = { register, login };
