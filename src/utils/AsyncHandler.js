
const AsyncHandler = (asyncFunction) => async (...args) => {
    try {
        const result = await asyncFunction(...args);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export default AsyncHandler;
