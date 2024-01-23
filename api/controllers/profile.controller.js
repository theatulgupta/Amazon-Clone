import findUserById from '../utils/user.util.js';

const getProfile = async (userId) => {
    const user = await findUserById(userId);
    return user;
}

export { getProfile };