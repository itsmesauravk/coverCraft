const mongoose = require("mongoose")
const { modelName } = require("./UserSchema")

const addToCart = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'},
    product : {type: mongoose.Schema.Types.ObjectId, ref: 'ProductSchema'},
    quantity : Number
},{timestamps:true}
)

const AddToCart = mongoose.model("Cart", addToCart)

module.exports  = AddToCart