function errorHandler(middleware) {
  return async (req, res, next) => {
    console.log('errorHandler');
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = errorHandler;
