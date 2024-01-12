import {
    loginUser,
    registerUser,
} from '../controllers/user.controller.js';

import asyncHandler from 'express-async-handler';
import express from 'express';
import { verifyEmail } from '../controllers/verification.controller.js';

const router = express.Router();

router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = await registerUser(name, email, password);
    res.json({ message: 'User registered successfully, verification email sent.', user: newUser });
}));

router.get('/verify/:token', asyncHandler(async (req, res) => {
    const token = req.params.token;
    const verifiedUser = await verifyEmail(token);
    res.json({ message: 'Email verified successfully' });
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
}));

export default router;
