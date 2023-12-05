import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../../../constants/base_urls';

const initialState = {
  items: [],
  item: {}
};

export const getProducts = createAsyncThunk('products/get products', async () => {
  const response = await axios.get(`${serverUrl}products`);
  return response?.data?.products;
});

export const getProduct = createAsyncThunk('product/get product', async (productId) => {
  const response = await axios.get(`${serverUrl}product/${productId}`);
  return response.data;
});

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.item = action.payload
        state.status = 'success';
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default products.reducer;
