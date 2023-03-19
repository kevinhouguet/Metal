class UpdateProfilError extends Error {
  constructor(route) {
    super(route);
    this.route = 'profil';
    this.message = 'Invalid Current Password';
    this.description = 'Le mot de passe courant est incorrect.';
    this.name = 'Update Profil Error';
    this.httpCode = 400;
  }
}

module.exports = UpdateProfilError;
