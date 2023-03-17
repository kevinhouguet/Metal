const db = require('./db');

async function getAllItemsWData() {
  const query = {
    text: ` SELECT "item".*, "metal"."name" as "metalName", "manuelprice"."price" as "prixManuel"  FROM "item"
            INNER JOIN "metal" ON "metal"."id" = "item"."metal_id"
            INNER JOIN "manuelprice" ON "manuelprice"."id" = "item"."price_id";`,
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
    text: ` SELECT "item".*, "manuelprice"."price"
            FROM "item"
            INNER JOIN "manuelprice" ON "item"."price_id" = "manuelprice"."id"
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
