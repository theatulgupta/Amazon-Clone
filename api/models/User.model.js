import mongoose, { Schema } from "mongoose";

export const addressSchema = {
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    houseNo: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    }
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    addresses: [addressSchema],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        }
    ],
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);