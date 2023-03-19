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

module.exports = {
  getAllItemsWData,
  getAllMetals,
  getItemsByMetalId,
  getUserByLogin,
  updatePassword,
};
