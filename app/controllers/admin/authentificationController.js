const bcrypt = require('bcrypt');
const datamapper = require('../../models/datamapper');
const SigninError = require('../../errors/SigninError');
const UpdateProfilError = require('../../errors/UpdateProfilError');

const saltRounds = 10;

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    res.render('signin');
  } else {
    next();
  }
}

async function signin(req, res, next) {
  const user = req.body;

  const userInDb = await datamapper.getUserByLogin(user.login);
  if (!userInDb) throw new SigninError();

  // const passwordHashed = await bcrypt.hash(user.password, saltRounds);

  const match = await bcrypt.compare(user.password, userInDb.password);

  if (!match) throw new SigninError();

  req.session.regenerate((err) => {
    if (err) next(err);

    // store user information in session, typically a user id
    req.session.user = {
      login: req.body.login,
    };

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save((error) => {
      if (error) return next(error);
      res.redirect('/admin');
    });
  });
}

function signout(req, res, next) {
  req.session.user = null;
  req.session.save((err) => {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate((err) => {
      if (err) next(err);
      res.redirect('/');
    });
  });
}

async function profil(req, res) {
  const { user } = req.session;
  const userInDb = await datamapper.getUserByLogin(user.login);
  if (!userInDb) throw new SigninError();

  res.status(200).render('profil', { user: userInDb });
}

async function updateProfil(req, res) {
  const user = req.body;
  const { login } = req.session.user;

  const userInDb = await datamapper.getUserByLogin(login);

  const match = await bcrypt.compare(user.currentPassword, userInDb.password);

  if (!match) throw new UpdateProfilError();

  const passwordHashed = await bcrypt.hash(user.newPassword, saltRounds);

  const processed = await datamapper.updatePassword(passwordHashed, login);

  // res.locals.processed = processed;

  res.status(200).render('profil');
}

module.exports = {
  isAuthenticated, signin, signout, profil, updateProfil,
};
