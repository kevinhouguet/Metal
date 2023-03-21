const datamapper = require('../../models/datamapper');
const itemDatamapper = require('../../models/itemDatamapper');

async function getHome(req, res) {
  const metals = await datamapper.getAllMetals();
  const items = await itemDatamapper.getAllItemsWData();
  res.status(200).render('admin', { metals, items });
}

module.exports = {
  getHome,
};
