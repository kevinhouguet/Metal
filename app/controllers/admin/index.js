function getHome(req, res) {
  res.status(200).render('admin');
}

module.exports = {
  getHome,
};
