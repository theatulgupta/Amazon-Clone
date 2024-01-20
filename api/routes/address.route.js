import { addAddress, getAddresses } from '../controllers/address.controller.js';

import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

router.post('/add', asyncHandler(async (req, res) => {
    const { userId, address } = req.body;
    await addAddress(userId, address);
    res.status(201).json({ message: 'Address added successfully' });
}));

router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const addresses = await getAddresses(userId);
    res.status(200).json(addresses);
}))

export default router;
