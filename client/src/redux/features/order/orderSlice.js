import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverUrl } from '../../../constants/base_urls';
import axios from 'axios';

const initialState = {
  loading: true,
  success: false,
  order: {},
  orderDetails: {}
};

export const createOrder = createAsyncThunk('order/create', async (order) => {
  try {
    const { data } = await axios.post(`${serverUrl}order/new`, order);
    return data
  } catch (error) {
    console.log(error)
  }
});

export const getOrders = createAsyncThunk('order/get orders', async (id) => {
  try {
    const { data } = await axios.get(`${serverUrl}admin/orders`);
    return data
  } catch (error) {
    console.log(error)
  }
});

export const getOrderDetails = createAsyncThunk('order/get order', async (id) => {
  try {
    const { data } = await axios.get(`${serverUrl}order/${id}`);
    return data
  } catch (error) {
    console.log(error)
  }
});

export const payOrder = createAsyncThunk('order/pay order', async (orderId, paymentResult) => {
  try {
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult);
    return data
  } catch (error) {
    console.log(error)
  }
});

export const getUserOrders = createAsyncThunk('order/list my-orders', async (userId) => {
  try {
    const { data } = await  axios.get(`${serverUrl}orders/me/${userId}`);
    return data
  } catch (error) {
    console.log(error)
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderInfo : (state, action) => {
      state.orderDetails = action.payload
    },
    resetOrderInfo : (state) => {
      state.orderDetails = {}
    },
    setAddressInfo : (state, action) => {
      state.orderDetails = { ...state.orderDetails, deliveryAddress: action.payload}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true,
        state.order = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true,
        state.order = action.payload
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true,
        state.order = action.payload
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true,
        state.order = action.payload
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true,
        state.order = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
  }
});
export const { setOrderInfo, setAddressInfo, resetOrderInfo } = orderSlice.actions
export default orderSlice.reducer;
