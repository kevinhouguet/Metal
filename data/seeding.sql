BEGIN;

INSERT INTO "metal"
("name")
VALUES
('cuivre'),
('aluminium'),
('carbure'),
('inox'),
('zinc'),
('plomb'),
('bronze'),
('laiton');


INSERT INTO "item"
("name","metal_id","price", "price_updated_at")
VALUES
('cuivre dénudé',1,5.00, NOW()),
('Cuivre élec dénudé souple',1, 6.50, NOW()),
('cuivre millberry',1, 6.70, NOW()),
('cuivre mélé',1, 6.00, NOW());

COMMIT;