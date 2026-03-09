const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    pin: { type: String, required: true },  // 4-digit PIN as string
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
//this comment is testing