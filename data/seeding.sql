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

INSERT INTO "manuelprice"
("price")
VALUES
(5.00),
(6.50),
(6.70),
(6.00);

INSERT INTO "item"
("name","metal_id","price_id")
VALUES
('cuivre dénudé',1, 1),
('Cuivre élec dénudé souple',1,2),
('cuivre millberry',1,3),
('cuivre mélé',1,4);

COMMIT;