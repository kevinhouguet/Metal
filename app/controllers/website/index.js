const datamapper = require('../../models/datamapper');

async function getHome(req, res) {
  const metals = await datamapper.getAllMetals();

  await Promise.all(metals.map(async (category) => {
    const items = await datamapper.getItemsByMetalId(category.id);
    if (items) category.items = items;
  }));

  res.status(200).render('home', { metals });
}

module.exports = {
  getHome,
};
