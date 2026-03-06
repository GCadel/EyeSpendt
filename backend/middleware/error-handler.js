const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };

  // Bad email
  if (err.code && err.code === 11000) {
    customError.msg = "Email already in use";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Validation errors
  if (err.name === "ValidationError") {
    customError.msg = "Form Errors";
    customError.messages = Object.values(err.errors).map((error) => {
      return { msg: error.message, field: error.path };
    });
  }

  // Bad transaction
  if (err.name === "CastError") {
    customError.msg = `No item found with ID ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({ error: customError });
};

module.exports = errorHandlerMiddleware;
