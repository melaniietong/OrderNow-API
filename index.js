const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

app.use(cors());
app.use(express.json());

// Add item to cart
app.post("/items", async(req, res) => {
    try {
        const { item_num, user_cookie, options, quantity } = req.body;
        const newItem = await pool.query(
            "INSERT INTO items(item_num, user_cookie, options, quantity) VALUES($1, $2, $3, $4) RETURNING *",
            [item_num, user_cookie, options, quantity]
        );
        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all items from a single user
app.get("/items", async(req, res) => {
    try {
        const { user_cookie } = req.body;
        const getItems = await pool.query(
            "SELECT * FROM items WHERE user_cookie = $1",
            [user_cookie]
        );
        res.json(getItems.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Update an item
app.put("/items/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { options, quantity, order_id } = req.body;
        if (options) {
            await pool.query( 
                "UPDATE items SET options = $1 WHERE item_id = $2",
                [options, id]
            );
        }

        if (quantity) {
            await pool.query( 
                "UPDATE items SET quantity = $1 WHERE item_id = $2",
                [quantity, id]
            );
        }

        if (order_id) {
            await pool.query( 
                "UPDATE items SET order_id = $1 WHERE item_id = $2",
                [order_id, id]
            );
        }
    } catch (err) {
        console.error(err.message);
    }
});

// Delete an item
app.delete("/items/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteItem = await pool.query(
            "DELETE FROM items WHERE item_id = $1", [id]
        );
    } catch (err) {
        console.error(err.message);  
    }
});

// Create an order
app.post("/orders", async(req, res) => {
    try {
        const { submit_time, order_status, is_takeout, delivery_address, instructions, order_name, phone } = req.body;
        const newOrder = await pool.query(
            "INSERT INTO orders(submit_time, order_status, is_takeout, delivery_address, instructions, order_name, phone) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [submit_time, order_status, is_takeout, delivery_address, instructions, order_name, phone]
        );
        res.json(newOrder.rows[0]);
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

// Update an order status
app.put("/orders/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { order_status, completed_time } = req.body;
        if (order_status) {
            await pool.query( 
                "UPDATE orders SET order_status = $1 WHERE order_id = $2",
                [order_status, id]
            );
        }

        if (completed_time) {
            await pool.query( 
                "UPDATE orders SET completed_time = $1 WHERE order_id = $2",
                [completed_time, id]
            );
        }
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000...")
})