import { User } from '../models/User.model.js';

const verifyEmail = async (token) => {
    // Find the user with the given token
    const user = await User.findOne({ verificationToken: token });

    // If user not found, throw an error
    if (!user) {
        throw new Error('Invalid verification token');
    }

    // If user found, then verify
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return user;
};

export { verifyEmail };