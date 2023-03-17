function getHome(req, res) {
  res.status(200).render('home');
}

module.exports = {
  getHome,
};
