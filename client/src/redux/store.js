import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './features/auth/authSlice';
import productReducer from './features/products/productSlice'
import cartReducer from './features/cart/cartSlice'
import adminReducer from './features/admin/adminProducts/adminReducer'
import enquiryReducer from './features/enquiry/enquirySlice'
import usersReducer from './features/cutomers/customerSlice'
import categoryReducer from './features/category/categorySlice'
import orderReducer from './features/order/orderSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, authReducer);
const persistedCardReducer = persistReducer(persistConfig, cartReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);

const rootReducer = {
  auth: persistedUserReducer,
  users: usersReducer,
  products: productReducer,
  admin: adminReducer,
  cart: persistedCardReducer,
  enquiry: enquiryReducer,
  category: categoryReducer,
  orders: persistedOrderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);
