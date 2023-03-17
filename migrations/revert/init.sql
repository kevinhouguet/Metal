-- Revert migrations:init from pg

BEGIN;

DROP TABLE "metal","manuelprice","item";

COMMIT;
