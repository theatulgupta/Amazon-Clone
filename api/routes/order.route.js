import { addOrder, getOrders } from '../controllers/order.controller.js';

import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

router.post('/add', asyncHandler(async (req, res) => {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    await addOrder(userId, cartItems, totalPrice, shippingAddress, paymentMethod);
    res.status(201).json({ message: 'Order created successfully' });
}));

router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const orders = await getOrders(userId);
    res.status(200).json(orders);
}))

export default router;
