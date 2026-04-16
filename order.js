const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth"); // Our bouncer!

const router = express.Router();

// @route   POST /api/orders
// @desc    Place a new order (Protected: Must be logged in)
router.post("/", auth, async (req, res) => {
    try {
        const { products, totalAmount } = req.body;

        // Create a new order. 
        // Notice we get the user ID automatically from the auth token!
        const newOrder = new Order({
            user: req.user.id, 
            products: products,
            totalAmount: totalAmount
        });

        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET /api/orders
// @desc    Get the logged-in user's past orders
router.get("/", auth, async (req, res) => {
    try {
        // Find only the orders that belong to the user who is currently logged in
        const orders = await Order.find({ user: req.user.id });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;