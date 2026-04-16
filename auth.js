const express = require("express");
const bcrypt = require("bcryptjs"); // This scrambles passwords so they are safe
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// This creates the URL: /api/auth/register
router.post("/register", async (req, res) => {
    try {
        // 1. Get the user's details from their request
        const { name, email, password } = req.body;

        // 2. Check if this email is already in our database
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 3. Prepare the new user
        user = new User({
            name,
            email,
            password
        });

        // 4. Scramble (hash) the password before saving it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 5. Save the user to MongoDB
        await user.save();

        // 6. Send a success message back
        res.status(201).json({ message: "User registered successfully!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 2. Check if the password matches the scrambled one in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Create the JWT Payload (the data we are putting inside the wristband)
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // 4. Sign the token and send it to the user
        // Note: In a real app, "mysecretkey" should be hidden in a .env file!
        jwt.sign(
            payload,
            "mysecretkey", 
            { expiresIn: "1h" }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;