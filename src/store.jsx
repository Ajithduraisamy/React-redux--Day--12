import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Change import statement

const store = configureStore({
    reducer: {
        cart: cartReducer // Change cartSlice to cartReducer
    }
});

export default store;
