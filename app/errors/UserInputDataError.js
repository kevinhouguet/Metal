class UserInputDataError extends Error {
  constructor(message, route) {
    super(message, route);
    this.route = route || 'admin';
    this.message = message || 'Invalid Input';
    this.name = 'UserInputDataError';
    this.httpCode = 400;
  }
}

module.exports = UserInputDataError;
