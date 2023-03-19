class SigninError extends Error {
  constructor(route) {
    super(route);
    this.route = 'signin';
    this.message = 'Invalid Credentials';
    this.description = 'Le login et / ou le mot de passe sont incorrect.';
    this.name = 'Signin Error';
    this.httpCode = 400;
  }
}

module.exports = SigninError;
