const datamapper = require('../../models/datamapper');

async function addMetalForm(req, res) {
  res.status(200).render('addMetal');
}

async function addMetal(req, res) {
  const { name: metalName } = req.body;
  await datamapper.addMetal(metalName);
  res.status(200).redirect('/admin');
}

module.exports = { addMetalForm, addMetal };
