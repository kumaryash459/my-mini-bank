const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: String,
    description: String,
    amount: Number,
    category: String,
    type: String
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);