const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth"); // Import our bouncer!

const router = express.Router();

// @route   POST /api/products
// @desc    Add a new product (Protected: Requires a token!)
router.post("/", auth, async (req, res) => {
    try {
        const { name, description, price, imageUrl, stock } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            imageUrl,
            stock
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET /api/products
// @desc    Get all products (Public: Anyone can view the store)
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;