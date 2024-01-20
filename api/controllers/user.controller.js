import { User } from '../models/User.model.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import sendVerificationEmail from '../utils/email.util.js';

const SALT_ROUNDS = 10;

const registerUser = asyncHandler(async (name, email, password) => {
    // Check if user exists
    const existingUser = await User.findOne({ email });

    // If user already exists, throw an error
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // Save newUser to the database
    await newUser.save();

    // Send verification email to the user
    await sendVerificationEmail(newUser.email, newUser.verificationToken);

    // Remove password from the new user object before returning it
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return userWithoutPassword;
});

const loginUser = asyncHandler(async (email, password) => {
    // Check if user exists
    const existingUser = await User.findOne({ email });

    // If user does not exist, throw an error
    if (!existingUser) {
        throw new Error('Invalid email or password');
    }

    // Compare hashed passwords asynchronously
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    // If password is incorrect, throw an error
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    // Generate secretKey with crypto
    const secretKey = crypto.randomBytes(32).toString('hex');

    // Generate a token and return it
    const token = jwt.sign({ userId: existingUser._id }, secretKey);

    // console.log(token);

    const decodedToken = jwt.decode(token);
    console.log(decodedToken);
    return token;
});

export {
    registerUser,
    loginUser
};
