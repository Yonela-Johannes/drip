import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../../../constants/base_urls';

const initialState = {
  _id: '',
  name: '',
  given_name: '',
  family_name: '',
  email: '',
  picture: '',
  quote: '',
  isAdmin: false,
  artist: {},
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  error: "",
};

export const signIn = createAsyncThunk('user/signin', async (userId) => {
  const response = await axios.post(`${serverUrl}user/login`, { oauthCode: userId });
  return response.data;
});

export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  const response = await axios.get(`${serverUrl}user/user/${userId}`);
  return response.data;
});

export const getOrders = createAsyncThunk(
  "order/get-orders", async (config) => {
    const response = await axios.get(`${serverUrl}user/getallorders`, config);
    return response.data
  }
);
export const getOrderByUser = createAsyncThunk(
  "order/get-order",
  async (id) => {
    const response = await axios.get(`${serverUrl}user/getorderbyuser/${id}`);
    return response.data
  }
);

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state._id = action.payload.user._id;
        state.given_name = action.payload.user.name;
        state.given_name = action.payload.user.given_name;
        state.family_name = action.payload.user.family_name;
        state.isAdmin = action.payload.user.isAdmin;
        state.email = action.payload.user.email;
        state.picture = action.payload.user.picture;
        state.artist = action.payload.user.artist;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state._id = action.payload.user._id;
        state.given_name = action.payload.user.name;
        state.given_name = action.payload.user.given_name;
        state.family_name = action.payload.user.family_name;
        state.isAdmin = action.payload.user.isAdmin;
        state.email = action.payload.user.email;
        state.picture = action.payload.user.picture;
        state.artist = action.payload.user.artist;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
