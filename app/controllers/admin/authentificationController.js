const bcrypt = require('bcrypt');
const datamapper = require('../../models/datamapper');

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
  if (!userInDb) throw new Error('not found');

  // const passwordHashed = await bcrypt.hash(user.password, saltRounds);

  const match = await bcrypt.compare(user.password, userInDb.password);

  if (!match) throw new Error('invalid credentials');

  req.session.regenerate((err) => {
    if (err) next(err);

    // store user information in session, typically a user id
    req.session.user = req.body;

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

module.exports = { isAuthenticated, signin, signout };
