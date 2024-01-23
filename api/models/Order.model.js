import mongoose, { Schema } from "mongoose";

import { addressSchema } from "./User.model.js";

const productSchema = {
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [productSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingAddress: addressSchema,
    paymentMethod: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);