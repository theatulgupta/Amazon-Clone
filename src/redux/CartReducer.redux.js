import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemPresent = state.cart.find(item => item.id === action.payload.id);
            if (itemPresent) {
                itemPresent.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            const itemPresent = state.cart.find(item => item.id === action.payload.id);
            if (itemPresent) {
                itemPresent.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const itemPresent = state.cart.find(item => item.id === action.payload.id);
            if (itemPresent && itemPresent.quantity > 1) {
                itemPresent.quantity--;
            } else {
                state.cart = state.cart.filter(item => item.id !== action.payload.id);
            }
        },
        cleanCart: (state) => {
            state.cart = [];
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;
