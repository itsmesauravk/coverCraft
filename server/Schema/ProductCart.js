const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductSchema' },
    quantity: Number
}, { timestamps: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
