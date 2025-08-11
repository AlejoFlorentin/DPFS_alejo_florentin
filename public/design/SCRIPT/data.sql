USE superlative_db;

INSERT INTO products (title, price, stock, category_id, description, created_at) VALUES
('Remera Oversize Negra', 131253, 18, 1, 'Inspirado en la moda contemporánea. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Musculosa Negra', 110228, 7, 1, 'Perfecto para combinar con tu outfit favorito. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Polo Gris', 142473, 3, 1, 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Remera Boxy Fit Gris', 134071, 19, 1, 'Diseño moderno y versátil para el día a día. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Cargo Pana', 118000, 6, 2, 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Jean Relaxed', 100652, 10, 2, 'Estilo oversize con personalidad. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Jean Straigth', 179254, 12, 2, 'Perfecto para combinar con tu outfit favorito. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Jean Recto', 26348, 10, 2, 'Comodidad sin perder elegancia. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Bermuda de Jean', 155960, 12, 3, 'Diseño moderno y versátil para el día a día. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Bermuda de Jean Negra', 132031, 18, 3, 'Diseño moderno y versátil para el día a día. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Bermuda Enzymatick', 171405, 19, 3, 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Alexander Mqueen', 85648, 15, 4, 'Perfecto para combinar con tu outfit favorito. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Air Force 07 White', 150000, 18, 4, 'Inspirado en la moda contemporánea. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50'),
('Dunk Bordeauz', 190000, 18, 4, 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.', '2025-08-11 18:33:50');


INSERT INTO product_imgs (product_id, url) VALUES
(1, '/img/products/camisetas/camisetaNegra.jpg'),
(2, '/img/products/camisetas/musculosa.jpg'),
(3, '/img/products/camisetas/poloGris.jpg'),
(4, '/img/products/camisetas/remeracat.jpg'),
(5, '/img/products/pantalones/cargoPana.jpg'),
(6, '/img/products/pantalones/jeanRelaxed.jpg'),
(7, '/img/products/pantalones/jeanStraight.jpg'),
(8, '/img/products/pantalones/pantalonescat.jpg'),
(9, '/img/products/bermudas/bermudasCat.jpg'),
(10, '/img/products/bermudas/bermudanegra.webp'),
(11, '/img/products/bermudas/bermudaenzymatick.webp'),
(12, '/img/products/zapatillas/zapatillascat.jpg'),
(13, '/img/products/zapatillas/airforce.webp'),
(14, '/img/products/zapatillas/dunkBordo.webp');


-- Camisetas (productos 1–4), todas las tallas
INSERT INTO product_sizes (product_id, size_id) VALUES
(1, 1), 
 (2, 2), 
 (3, 4),
 (4, 4),

-- Pantalones (productos 5–8), tallas M, L, XL
(5, 2), 
 (6, 4),
 (7, 3), 
 (8, 3), 

-- Bermudas (productos 9–11), tallas M, L
(9, 2), 
 (10, 3),
(11, 2), 

-- Zapatillas (productos 12–14), tallas M, L
(12, 2),
 (13, 3),
(14, 2)
