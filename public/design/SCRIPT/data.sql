USE superlative_db;

INSERT INTO products (title, price,stock, category, img, description) VALUES
(1, 'Remera Oversize Negra', 131253, 18, 1, '/img/products/camisetas/camisetaNegra.jpg', 'Inspirado en la moda contemporánea. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(2, 'Musculosa Negra', 110228, 7, 1, '/img/products/camisetas/musculosa.jpg', 'Perfecto para combinar con tu outfit favorito. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(3, 'Polo Gris', 142473,  3, 1, '/img/products/camisetas/poloGris.jpg', 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(4, 'Remera Boxy Fit Gris', 134071, 19, 1, '/img/products/camisetas/remeracat.jpg', 'Diseño moderno y versátil para el día a día. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(5, 'Cargo Pana', 118000,  6, 2, '/img/products/pantalones/cargoPana.jpg', 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(6, 'Jean Relaxed', 100652,  10, 2, '/img/products/pantalones/jeanRelaxed.jpg', 'Estilo oversize con personalidad. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(7, 'Jean Straigth', 179254,  12, 2, '/img/products/pantalones/jeanStraight.jpg', 'Perfecto para combinar con tu outfit favorito. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(8, 'Jean Recto', 26348, 10, 2, '/img/products/pantalones/pantalonescat.jpg', 'Comodidad sin perder elegancia. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(9, 'Bermuda de Jean', 155960, 12, 3, '/img/products/bermudas/bermudasCat.jpg', 'Diseño moderno y versátil para el día a día. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(10, 'Bermuda de Jean Negra', 132031,  18, 3, '/img/products/bermudas/bermudanegra.webp', 'Diseño moderno y versátil para el día a día. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(11, 'Bermuda Enzymatick', 171405, 19, 3, '/img/products/bermudas/bermudaenzymatick.webp', 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(12, 'Alexander Mqueen', 85648, 15, 4, '/img/products/zapatillas/zapatillascat.jpg', 'Perfecto para combinar con tu outfit favorito. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(13, 'Air Force 07 White', 150000, 18, 4, '/img/products/zapatillas/airforce.webp', 'Inspirado en la moda contemporánea. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.'),
(14, 'Dunk Bordeauz', 190000, 18, 4, '/img/products/zapatillas/dunkBordo.webp', 'Ideal para toda ocasión con estilo único. Confeccionado con materiales de primera calidad, garantiza durabilidad, confort y un ajuste perfecto. Pensado para quienes buscan estilo y funcionalidad en una sola prenda. Ideal para uso diario o para destacarte en una ocasión especial.');

INSERT INTO product_imgs(product_id,url) VALUES
(1,'/img/products/camisetas/camisetaNegra.jpg'),

-- Camisetas (productos 1–4), todas las tallas
INSERT INTO product_sizes (product, size) VALUES
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
