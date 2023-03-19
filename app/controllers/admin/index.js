const datamapper = require('../../models/datamapper');

async function getHome(req, res) {
  const metals = await datamapper.getAllMetals();
  const items = await datamapper.getAllItemsWData();
  res.status(200).render('admin', { metals, items });
}

module.exports = {
  getHome,
};
