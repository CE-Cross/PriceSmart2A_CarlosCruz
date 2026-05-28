/*
Campos:
    customerId
    products:
        productID
        quantity
        subtotal
    total
    status
*/

import mongoose, { Schema, model } from "mongoose";
import Customers from "../models/customers.js";
import Products from "../models/products.js";

const cartSchema = new Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: Customers
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: Products
            },
            quantity: {type: Number},
            subtotal: {type: Number}
        }
    ],
    total: {type: Number},
    status: {type: String}
},
{
    timestamps: true,
    strict: false
});

export default model("cartModel", cartSchema);