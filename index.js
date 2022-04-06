const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

app.use(cors());
app.use(express.json());

// Create an order
app.post("/orders", async(req, res) => {
    try {
        console.log(req.body);
        const { submit_time, order_status, is_takeout, delivery_address, instructions, order_name, phone } = req.body;
        const newOrder = await pool.query(
            "INSERT INTO orders(submit_time, order_status, is_takeout, delivery_address, instructions, order_name, phone) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [submit_time, order_status, is_takeout, delivery_address, instructions, order_name, phone]
        );
    } catch (err) {
        console.error(err.message);
    }
});

// Get all orders
app.get("/orders", async(req, res) => {
    try {
        const allOrders = await pool.query(
            "SELECT * FROM orders"
        );
        res.json(allOrders.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000...")
})