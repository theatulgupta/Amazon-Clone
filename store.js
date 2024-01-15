import CartReducerRedux from './src/redux/CartReducer.redux';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        cart: CartReducerRedux
    }
});
