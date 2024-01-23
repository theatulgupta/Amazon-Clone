import asyncHandler from 'express-async-handler';
import express from 'express';
import { getProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const profile = await getProfile(userId);
    res.json(profile);
}))

export default router;
