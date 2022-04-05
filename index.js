const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

app.use(cors());
app.use(express.json());

// create an order

app.post("/orders", async(req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.error(err.message);
    }
})

// get all orders



app.listen(4000, () => {
    console.log("Server running on port 4000...")
})