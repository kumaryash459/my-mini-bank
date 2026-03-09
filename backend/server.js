const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db.js");
const User = require("./models/User.js");
const Transaction = require("./models/Transaction.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("Mini-Bank Backend is Running!");
});

/* ------------------ Signup ------------------ */
app.post("/signup", async (req, res) => {
    try {
        const { username, pin } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ username, pin });
        await newUser.save();

        res.json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* ------------------ Login ------------------ */

app.post("/login", async (req, res) => {
    try {
        const { username, pin } = req.body;

        const user = await User.findOne({ username, pin });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            userId: user._id,
            username: user.username
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* ------------------ Add Transaction ------------------ */

app.post("/add-transaction", async (req, res) => {
    try {
        const { username, date, description, amount, category, type } = req.body;

        const transaction = new Transaction({
            username,
            date,
            description,
            amount,
            category,
            type
        });

        await transaction.save();

        res.json({ message: "Transaction added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* ------------------ Get Transactions for User ------------------ */

app.get("/transactions/:username", async (req, res) => {
    try {
        const transactions = await Transaction.find({
            username: req.params.username
        }).sort({ date: -1 });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/* ------------------ Start Server ------------------ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});