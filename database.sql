CREATE DATABASE ordernow;

DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    submit_time TIMESTAMPTZ NOT NULL,
    order_status INT NOT NULL,
    is_takeout BOOLEAN NOT NULL,
    delivery_address VARCHAR(255),
    instructions VARCHAR(255),
    order_name VARCHAR(255) NOT NULL,
    phone CHAR(10) NOT NULL,
    completed_time TIMESTAMPTZ
);

CREATE TABLE items(
    item_id SERIAL PRIMARY KEY NOT NULL,
    item_num INT NOT NULL,
    user_cookie INT NOT NULL,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    options VARCHAR(255),
    quantity INT NOT NULL
);