class CustomAPIError extends Errors {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIError;
