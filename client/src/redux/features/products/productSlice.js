import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
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

export const createProduct = createAsyncThunk('product/get product', async ({userId, product}) => {
  const response = await axios.post(`${serverUrl}product`, {userId: userId, product: product});
  return response.data;
});

export const createComment = createAsyncThunk('product/comment-product', async ({userId, comment, productId}) => {
  const response = await axios.post(`${serverUrl}product/comment`, {userId, comment, productId});
  return response.data;
});

export const createReview = createAsyncThunk('product/review-product', async ({userId, comment, productId, rating}) => {
  const response = await axios.post(`${serverUrl}product/review`, {userId: userId, comment, productId, rating});
  return response.data;
});

export const deleteProduct = createAsyncThunk('product/delete-product', async (productId) => {
  const response = await axios.delete(`${serverUrl}product/${productId}`);
  return response?.data?.products;
});

export const resetState = createAction("RevertAll");

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
      })
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.item = action.payload
        state.status = 'success';
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.item = action.payload
        state.status = 'success';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default products.reducer;
