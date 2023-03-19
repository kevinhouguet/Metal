const db = require('./db');

async function getAllItemsWData() {
  const query = {
    text: ` SELECT "item".*, "metal"."name" as "metalName" FROM "item"
            INNER JOIN "metal" ON "metal"."id" = "item"."metal_id";`,
  };

  const result = await db.query(query);
  return result.rows;
}

async function getAllMetals() {
  const query = {
    text: ' SELECT * FROM "metal";',
  };

  const result = await db.query(query);
  return result.rows;
}

async function getItemsByMetalId(id) {
  const query = {
    text: ` SELECT "item".*, "metal"."name" as "metalName"
            FROM "item"
            INNER JOIN "metal" ON "metal"."id" = "item"."metal_id"
            WHERE "item"."metal_id" = $1;`,
    values: [id],
  };

  const result = await db.query(query);
  return result.rows;
}

async function getUserByLogin(login) {
  const query = {
    text: ` SELECT * FROM "user"
            WHERE "user"."login" = $1;`,
    values: [login],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function updatePassword(password, login) {
  const query = {
    text: ` UPDATE "user"
            SET "password" = $1,
            "updated_at" = now()
            WHERE "user"."login" = $2
            RETURNING "id";`,
    values: [password, login],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function addMetal(metalName) {
  const query = {
    text: ` INSERT INTO "metal" ("name")
            VALUES ($1)
            RETURNING *;`,
    values: [metalName],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function updateMetal(name, id) {
  const query = {
    text: ` UPDATE "metal" SET "name" = $1, "updated_at" = now() WHERE "id" = $2
            RETURNING *;`,
    values: [name, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function deleteMetal(id) {
  const query = {
    text: 'DELETE "metal" WHERE "id" = $1',
    values: [id],
  };

  await db.query(query);
}

async function addItem(name, price, update, metalId) {
  const query = {
    text: ` INSERT INTO "item" ("name", "price", "price_updated_at", "metal_id")
            VALUES ($1, $2, $3,$4)
            RETURNING *;`,
    values: [name, price, update, metalId],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function updateItemName(name) {
  const query = {
    text: ` UPDATE "item" 
            SET "name" = $1
            RETURNING *;`,
    values: [name],
  };

  const result = await db.query(query);
  return result.rows[0];
}
async function updateItemMetalId(metalId) {
  const query = {
    text: ` UPDATE "item" 
            SET "metal_id" = $1
            RETURNING *;`,
    values: [metalId],
  };

  const result = await db.query(query);
  return result.rows[0];
}
async function updateItemPrice(price) {
  const query = {
    text: ` UPDATE "item" 
            SET "price" =$1, "price_updated_at" = now())
            RETURNING *;`,
    values: [price],
  };

  const result = await db.query(query);
  return result.rows[0];
}

module.exports = {
  getAllItemsWData,
  getAllMetals,
  getItemsByMetalId,
  getUserByLogin,
  updatePassword,
  addMetal,
  updateMetal,
  deleteMetal,
  addItem,
  updateItemName,
  updateItemMetalId,
  updateItemPrice,
};
