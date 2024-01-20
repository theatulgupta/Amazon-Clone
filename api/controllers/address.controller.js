import { User } from '../models/User.model.js';

const findUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const addAddress = async (userId, address) => {
    const user = await findUserById(userId);
    user.addresses.push(address);
    await user.save();
};

const getAddresses = async (userId) => {
    const user = await findUserById(userId);
    return user.addresses;
};

const removeAddress = async (userId, addressId) => {
    const user = await findUserById(userId);

    // Find the index of the address to be removed
    const indexToRemove = user.addresses.findIndex((address) => address._id === addressId);

    // If address not found, throw an error
    if (indexToRemove === -1) {
        throw new Error('Address not found');
    }

    // Remove the address at the specified index
    user.addresses.splice(indexToRemove, 1);

    // Save the user
    await user.save();
};

export { addAddress, getAddresses, removeAddress };
