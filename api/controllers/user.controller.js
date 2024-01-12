import { User } from '../models/User.model.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import sendVerificationEmail from '../utils/email.util.js';

const registerUser = async (name, email, password) => {
    // Check if user exists
    const existingUser = await User.findOne({ email });

    // If user already exists, throw an error
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // Save newUser to the database
    await newUser.save();

    // Send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    return newUser;
};

const loginUser = async (email, password) => {
    // Check if user exists
    const existingUser = await User.findOne({ email });

    // If user does not exist, throw an error
    if (!existingUser) {
        throw new Error('Invalid email or password');
    }

    // If password is incorrect, throw an error
    if (existingUser.password !== password) {
        throw new Error('Invalid password');
    }

    // Generate secretKey with crypto
    const secretKey = crypto.randomBytes(32).toString('hex');

    // Generate a token and return it
    const token = jwt.sign({ userId: existingUser._id }, secretKey);

    return token;
}

export {
    registerUser,
    loginUser
};