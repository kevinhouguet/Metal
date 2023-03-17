-- Deploy migrations:init to pg

BEGIN;

CREATE TABLE "metal" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text not null,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "manuelprice" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "price" decimal not null,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "item" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text not null,
    "metal_id" int not null,
    "price_id" int not null,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ,
    Foreign Key ("metal_id") REFERENCES "metal"("id"),
    Foreign Key ("price_id") REFERENCES "manuelprice"("id")
);
COMMIT;
