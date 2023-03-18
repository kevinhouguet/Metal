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

module.exports = {
  getAllItemsWData,
  getAllMetals,
  getItemsByMetalId,
};
