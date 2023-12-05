import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../../../../constants/base_urls';

const initialState = {
  items: [],
  item: {},
  users: [],
  user: {}
};

export const getAdminProducts = createAsyncThunk('products/get admin products', async () => {
  const response = await axios.get(`${serverUrl}products`);
  return response?.data?.products;
});

export const getAdminProduct = createAsyncThunk('product/get admin product', async (productId) => {
  const response = await axios.get(`${serverUrl}product/${productId}`);
  return response?.data;
});

export const getAdminUsers = createAsyncThunk('users/get admin users', async () => {
  const response = await axios.get(`${serverUrl}admin/users`);
  return response?.data;
});

export const getAdminUser = createAsyncThunk('user/get admin user', async (productId) => {
  const response = await axios.get(`${serverUrl}user/${productId}`);
  return response?.data?.user;
});

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAdminProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success';
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAdminProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.item = action.payload
        state.status = 'success';
      })
      .addCase(getAdminProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAdminUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminUsers.fulfilled, (state, action) => {
        state.users = action.payload.users
        state.status = 'success';
      })
      .addCase(getAdminUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAdminUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminUser.fulfilled, (state, action) => {
        state.user = action.payload.users
        state.status = 'success';
      })
      .addCase(getAdminUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default admin.reducer;
