CREATE DATABASE ordernow;

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
)