-- Revert migrations:user_table from pg

BEGIN;

DROP TABLE "user";

COMMIT;
