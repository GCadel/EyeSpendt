const BadRequestError = require("./BadRequest");
const CustomAPIError = require("./custom-api");
const NotFound = require("./NotFound");
const Unauthenticated = require("./Unathenticated");

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFound,
  Unauthenticated,
};
