import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.product._id === action.payload._id);
      if (existingItem) {
        existingItem.product.quantity += 1;
        existingItem.product.total += Number(action.payload.price);
      } else {
        state.items.push({
          product: {
            ...action.payload,
            quantity: 1,
            total: Number(action.payload.price)
          }
        });
      }
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find((item) => item.product._id === action.payload._id);
      if (existingItem) {
        if (existingItem.product.quantity <= 1) {
          return { items: state.items.filter((item) => item.product._id !== action.payload?._id) };
        } else {
          existingItem.product.quantity -= 1;
          existingItem.product.total -= action.payload.price;
        }
      }
    },
  },
});
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
