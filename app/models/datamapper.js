const db = require('./db');

async function getAllMetals() {
  const query = {
    text: ` SELECT * FROM "metal" 
            LEFT JOIN (SELECT "metal_id",count(*) as "nb" FROM "item" GROUP BY "metal_id") "nbItems" ON "nbItems"."metal_id" = "id"
            ORDER BY "nbItems"."nb", "metal"."name";`,
  };

  const result = await db.query(query);
  return result.rows;
}

async function getMetalById(id) {
  const query = {
    text: ' SELECT * FROM "metal" WHERE "id" =$1;',
    values: [id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

async function getItemsByMetalId(id) {
  const query = {
    text: ` SELECT "item".*, "metal"."name" as "metalName"
            FROM "item"
            INNER JOIN "metal" ON "metal"."id" = "item"."metal_id"
            WHERE "item"."metal_id" = $1
            ORDER BY "metal"."name";`,
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
    text: 'DELETE FROM "metal" WHERE "id" = $1',
    values: [id],
  };

  await db.query(query);
}

module.exports = {
  getAllMetals,
  getItemsByMetalId,
  getUserByLogin,
  updatePassword,
  addMetal,
  updateMetal,
  deleteMetal,
  getMetalById,
};
