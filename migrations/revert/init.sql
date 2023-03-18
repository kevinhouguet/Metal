-- Revert migrations:init from pg

BEGIN;

DROP TABLE "metal","item";

COMMIT;
