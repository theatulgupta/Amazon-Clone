import { Order } from '../models/Order.model.js';
import findUserById from '../utils/user.util.js';

const addOrder = async (userId, cartItems, totalPrice, shippingAddress, paymentMethod) => {
    const user = await findUserById(userId);
    const products = cartItems.map((item) => ({
        name: item?.title,
        quantity: item.quantity,
        price: item.price,
        image: item?.image,
    }));
    const order = new Order({
        user: userId,
        products: products,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
    });
    await order.save();

    user.orders.push(order._id);
    await user.save();
};

const getOrders = async (userId) => {
    const orders = await Order.find({ user: userId }).populate('user');
    if (!orders) {
        throw new Error('No orders found');
    }
    return orders;
}

export { addOrder, getOrders };