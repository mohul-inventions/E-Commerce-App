const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import our models to ensure they register with Mongoose properly
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to read JSON data from the frontend

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);

app.use("/api/orders", require("./routes/order"));

// Connect to MongoDB (Notice we changed the database name to 'ecommerce')
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    .then(() => console.log("MongoDB connected to E-Commerce database"))
    .catch(err => console.log("MongoDB connection error:", err));

// A simple test route
app.get("/", (req, res) => {
    res.send("E-Commerce API is running...");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});