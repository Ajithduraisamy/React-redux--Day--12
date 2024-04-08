import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if available
const initialState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : { cart: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = { ...action.payload, quantity: 1 }; // Initialize quantity to 1
            state.cart.push(newItem);
            // Save cart state to localStorage
            localStorage.setItem('cartState', JSON.stringify(state));
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.cart.findIndex(item => item.id === productId);
            if (itemIndex !== -1) {
                state.cart[itemIndex].quantity = quantity;
                // Save cart state to localStorage
                localStorage.setItem('cartState', JSON.stringify(state));
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter(item => item.id !== productId);
            // Save cart state to localStorage
            localStorage.setItem('cartState', JSON.stringify(state));
        }
    }
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;