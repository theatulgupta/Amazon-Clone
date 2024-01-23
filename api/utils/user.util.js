import { User } from '../models/User.model.js';

export default async function findUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};