const datamapper = require('../../models/datamapper');

async function getHome(req, res) {
  const metals = await datamapper.getAllMetals();

  await Promise.all(metals.map(async (metal) => {
    const items = await datamapper.getItemsByMetalId(metal.id);
    if (items) {
      metal.items = items;
    }
  }));
  console.log(metals);
  res.status(200).render('home', { metals });
}

module.exports = {
  getHome,
};
