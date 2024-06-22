import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartState: false,
  cartTotalAmount: 0,
  cartTotalQantity: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOpenCart: (state, action) =>
    {
      state.cartState = true;
    },
    setCloseCart: (state, action) =>
    {
      state.cartState = false;
    },
    addItem: (state, action) =>
    {
      const existingItem = state.items.find((item) => item.product._id === action.payload._id);
      if (existingItem)
      {
        existingItem.product.quantity += 1;
        toast.success(`Item QTY Increased`);
        existingItem.product.total += Number(action.payload.price);
        toast.success(`${action.payload.name} added to Cart`);
      } else
      {
        state.items.push({
          product: {
            ...action.payload,
            quantity: 1,
            total: Number(action.payload.price)
          }
        });
        toast.success(`${action.payload.name} added to Cart`);
      }
    },
    removeItem: (state, action) =>
    {
      const existingItem = state.items.find((item) => item.product._id === action.payload._id);
      if (existingItem)
      {
        if (existingItem.product.quantity <= 1)
        {
          toast.success(`${action.payload.name} Decreased`);
          return { items: state.items.filter((item) => item.product._id !== action.payload?._id) };
        } else
        {
          existingItem.product.quantity -= 1;
          toast.success(`Item QTY Decreased`);
          existingItem.product.total -= action.payload.price;
          toast.success(`${action.payload.name} removed from Cart`);
        }
      }
    },
    clearCart: (state) =>
    {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
    },
    setGetTotals: (state, action) =>
    {
      let { totalAmount, totalQTY } = state.cartItems.reduce((cartTotal, cartItem) =>
      {
        const { price, cartQuantity } = cartItem;
        const totalPrice = price * cartQuantity;

        cartTotal.totalAmount += totalPrice;
        cartTotal.totalQTY += cartQuantity;

        return cartTotal;
      }, {
        totalAmount: 0,
        totalQTY: 0,
      });

      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQTY;
    },
  },
});

export const { addItem, removeItem, setGetTotals, setOpenCart, setCloseCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
