DROP TABLE IF EXISTS products;
CREATE TABLE products(
    id serial PRIMARY KEY, 
    name VARCHAR(255), 
    manufacturer VARCHAR(255),
    price INTEGER,
    alcohol REAL,
    available BOOLEAN,
    description VARCHAR(255)
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(
    id serial PRIMARY KEY, 
    product_id INTEGER, 
    date DATE,
    full_price INTEGER,
    status VARCHAR(255)
);

DROP SEQUENCE IF EXISTS hibernate_sequence;
CREATE SEQUENCE hibernate_sequence START 1;