import mongoose from "mongoose";

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
});

export default mongoose.model("Transaction", transactionSchema);