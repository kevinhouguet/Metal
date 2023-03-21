const datamapper = require('../../models/datamapper');

async function addMetalForm(req, res) {
  res.status(200).render('addMetal');
}

async function addMetal(req, res) {
  const { name: metalName } = req.body;
  await datamapper.addMetal(metalName);
  res.status(200).redirect('/admin');
}

async function updateMetalForm(req, res) {
  const { id } = req.params;
  let metals = [];
  if (id) {
    metals = [await datamapper.getMetalById(parseInt(id, 10))];
  } else {
    metals = await datamapper.getAllMetals();
  }
  res.status(200).render('updateMetal', { metals });
}

async function updateMetal(req, res) {
  const { name: metalName, id: metalId } = req.body;
  await datamapper.updateMetal(metalName, metalId);
  res.status(200).redirect('/admin');
}

async function delMetalForm(req, res) {
  const metals = await datamapper.getAllMetals();
  res.status(200).render('delMetal', { metals });
}
async function delMetal(req, res) {
  const { id: metalId } = req.body;
  const { id } = req.params;
  await datamapper.deleteMetal(metalId || id);
  res.status(200).redirect('/admin');
}
module.exports = {
  addMetalForm, addMetal, updateMetal, updateMetalForm, delMetalForm, delMetal,
};
