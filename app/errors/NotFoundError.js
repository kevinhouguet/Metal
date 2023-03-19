class NotFoundError extends Error {
  constructor(route) {
    super(route);
    this.route = 'notfound';
    this.name = 'Not Found Error';
    this.httpCode = 404;
  }
}

module.exports = NotFoundError;
