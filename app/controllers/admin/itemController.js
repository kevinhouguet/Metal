const itemDatamapper = require('../../models/itemDatamapper');
const datamapper = require('../../models/datamapper');
const UserInputError = require('../../errors/UserInputDataError');
const NotFoundError = require('../../errors/NotFoundError');

async function addItemForm(req, res) {
  const metals = await datamapper.getAllMetals();
  console.log('addItemForm');
  res.render('addItem', { metals });
}

async function addItem(req, res) {
  const item = req.body;
  console.log(item);
  if (
    !item
    || !item.name
    || !item.price
    || !item.metalId
    || Number.isNaN(parseInt(item.price, 10))
    || Number.isNaN(parseInt(item.metalId, 10))
  ) {
    throw new UserInputError('Input Data Invalid', 'addItem');
  }

  await itemDatamapper.addItem(item.name, item.price, item.metalId);

  res.redirect('/admin');
}

async function updateItemForm(req, res) {
  const { id } = req.params;
  const metals = await datamapper.getAllMetals();
  let items = [];
  if (id) {
    items = [await itemDatamapper.getItemById(parseInt(id, 10))];
  } else {
    items = await itemDatamapper.getAllItemsWData();
  }
  console.log(items);
  console.log('updateItemForm');
  res.render('updateItem', { items, metals });
}

async function updateItem(req, res) {
  const {
    itemId, name, metalId, price,
  } = req.body;
  const itemInDb = itemDatamapper.getItemById(itemId);
  if (!itemInDb) throw new NotFoundError();
  if (itemInDb.name !== name) await itemDatamapper.updateItemName(name, parseInt(itemId, 10));
  if (itemInDb.metal_id !== metalId) {
    await itemDatamapper.updateItemMetalId(metalId, parseInt(itemId, 10));
  }
  if (itemInDb.price !== price) {
    await itemDatamapper.updateItemPrice(parseFloat(price), parseInt(itemId, 10));
  }
  res.redirect('/admin');
}

module.exports = {
  addItemForm,
  addItem,
  updateItemForm,
  updateItem,
};
