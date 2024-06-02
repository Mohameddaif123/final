import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    checkoutStatus: 'idle',
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity if item already exists in cart
            } else {
                state.cartItems.push({ ...newItem, quantity: 1 }); // Add item with quantity 1 if not already in cart
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cartItems.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1; // Decrease quantity if greater than 1
            } else {
                state.cartItems = state.cartItems.filter(item => item.id !== itemId); // Remove item if quantity is 1
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity += 1; // Increase quantity
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        checkoutPending: (state) => {
            state.checkoutStatus = 'pending';
        },
        checkoutSuccess: (state) => {
            state.cartItems = [];
            state.checkoutStatus = 'success';
            localStorage.removeItem('cartItems'); // Clear cart items from local storage upon successful checkout
        },
        checkoutFailure: (state) => {
            state.checkoutStatus = 'failure';
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
        },
        updateItemInCart: (state, action) => {
            const { id, updatedProd } = action.payload;
            const index = state.cartItems.findIndex(item => item.id === id);
            if (index !== -1) {
                state.cartItems[index] = { ...state.cartItems[index], ...updatedProd };
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Update local storage
            }
        },
    },
});

export const { addItemToCart, removeItemFromCart, decreaseQuantity, increaseQuantity, checkoutPending, checkoutSuccess, checkoutFailure, setCartItems, updateItemInCart } = cartSlice.actions;

export const selectCart = state => state.cart.cartItems;
export const selectCheckoutStatus = state => state.cart.checkoutStatus;
export const selectCartCount = state => state.cart.cartItems.length; // Selector for cart count

export default cartSlice.reducer;
