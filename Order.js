const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // Links this order to a specific User
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    // An array of products bought and their quantities
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
        default: "Pending" 
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);