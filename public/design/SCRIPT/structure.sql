CREATE DATABASE superlative_db;

USE superlative_db;

CREATE TABLE user_categories (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50)
);

CREATE TABLE users (
id INT PRIMARY KEY AUTO_INCREMENT,
firstName VARCHAR (50),
lastName VARCHAR(100),
telefono VARCHAR(50),
email VARCHAR(100),
password VARCHAR(100),
category INT,
image VARCHAR(100),
CONSTRAINT category_fk FOREIGN KEY (category) REFERENCES user_categories(id)
);

CREATE TABLE products_categories (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50)
);

CREATE TABLE sizes (
id INT PRIMARY KEY AUTO_INCREMENT,
size VARCHAR(50)
);

CREATE TABLE products (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(100),
price FLOAT,
stock INT,
category INT,
img VARCHAR(100),
description VARCHAR(400),
CONSTRAINT categoria_fk FOREIGN KEY (category) REFERENCES products_categories(id)
);

CREATE TABLE product_sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product INT,
  size INT,
  FOREIGN KEY (product) REFERENCES products(id),
  FOREIGN KEY (size) REFERENCES sizes(id)
);


CREATE TABLE orders (
id INT PRIMARY KEY AUTO_INCREMENT,
date_create TIMESTAMP,
user INT,
total FLOAT,
items INT,
CONSTRAINT user_fk FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE orders_details (
id INT PRIMARY KEY AUTO_INCREMENT,
orders INT,
product INT,
CONSTRAINT order_fk FOREIGN KEY (orders) REFERENCES orders(id),
CONSTRAINT product_fk FOREIGN KEY (product) REFERENCES products(id)
);
