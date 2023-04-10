// calling the db connection module
const db = require('./db');

// create an asynchronous function because of request on other server
// this function retrieve all metals with count of items for each metals
async function getAllMetals() {
  const query = {
    text: ` SELECT * FROM "metal" 
            LEFT JOIN (
              SELECT "metal_id",count(*) as "nb" 
              FROM "item" 
              GROUP BY "metal_id"
            ) "nbItems" ON "nbItems"."metal_id" = "id"
            ORDER BY "nbItems"."nb", "metal"."name";`,
  };
  // calling awaiting db method to pass the query
  const result = await db.query(query);
  // return all results rows. This is an array type.
  return result.rows;
}

// this function retrieve one metal by its id
// using parameterized query to secure data injected in db
// to use this we setting up a variable named "values" to parse parameter
// that is sending from client
// https://node-postgres.com/features/queries#parameterized-query
// prevent to sql injection : https://en.wikipedia.org/wiki/SQL_injection
async function getMetalById(id) {
  const query = {
    text: ' SELECT * FROM "metal" WHERE "id" =$1;',
    values: [id],
  };

  const result = await db.query(query);
  // return only one thing so we return not full array but only the first
  // index of this array.
  return result.rows[0];
}

// this function retrieve all items based on each metals id of the item
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

// This function update user password by user id
// and retrieve user id if transaction correctly worked
async function updatePassword(password, id) {
  const query = {
    text: ` UPDATE "user"
            SET 
              "password" = $1,
              "updated_at" = now()
            WHERE "user"."id" = $2
            RETURNING "id";`,
    values: [password, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

// This function insert metal in database
// and retrieve the new metal
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

// This function update one metal base on metal id
// and retrieve the metal updated
async function updateMetal(name, id) {
  const query = {
    text: ` UPDATE "metal" 
            SET 
              "name" = $1, 
              "updated_at" = now() 
            WHERE "id" = $2
            RETURNING *;`,
    values: [name, id],
  };

  const result = await db.query(query);
  return result.rows[0];
}

// This function delete a metal from database
// This is hard delete because the metal is remove from database
// but we can make soft delete too with a stat field which can
// pass from up to down. And in client side or get metal function
// in server-side we can retrieve only metal with up stat.
// This is good for version history or to back office management.
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
