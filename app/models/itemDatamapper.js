const db = require('./db');

async function getItemById(id) {
  const query = {
    text: ` SELECT "item".*, "metal"."name" as "metalName" FROM "item"
            INNER JOIN "metal" ON "metal"."id" = "item"."metal_id"
            WHERE "item"."id" = $1`,
    values: [id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function getAllItemsWData() {
  const query = {
    text: ` SELECT "item".*, "metal"."name" as "metalName" FROM "item"
            INNER JOIN "metal" ON "metal"."id" = "item"."metal_id";`,
  };

  const result = await db.query(query);
  return result.rows;
}

async function addItem(name, price, metalId) {
  const query = {
    text: ` INSERT INTO "item" ("name", "price", "price_updated_at", "metal_id")
            VALUES ($1, $2, now(),$3)
            RETURNING *;`,
    values: [name, price, metalId],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function updateItemName(name, id) {
  const query = {
    text: ` UPDATE "item" 
            SET "name" = $1
            WHERE "item"."id" = $2
            RETURNING *;`,
    values: [name, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}
async function updateItemMetalId(metalId, id) {
  const query = {
    text: ` UPDATE "item" 
            SET "metal_id" = $1
            WHERE "item"."id" = $2
            RETURNING *;`,
    values: [metalId, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}
async function updateItemPrice(price, id) {
  const query = {
    text: ` UPDATE "item" 
            SET "price" =$1, "price_updated_at" = now()
            WHERE "item"."id" = $2
            RETURNING *;`,
    values: [price, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function deleteItem(id) {
  const query = {
    text: 'DELETE FROM "item" WHERE "id" = $1',
    values: [id],
  };

  await db.query(query);
}

module.exports = {
  addItem,
  updateItemName,
  updateItemMetalId,
  updateItemPrice,
  deleteItem,
  getItemById,
  getAllItemsWData,
};
