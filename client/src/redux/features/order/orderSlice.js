import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: true,
  success: false,
  order: {},
  orderDetails: {}
};

export const createOrder = createAsyncThunk('order/create', async (order) => {
  try {
    const { data } = await axios.post("/api/orders", order);
    return data
  } catch (error) {
    console.log(error)
    // dispatch({
    //   type: ORDER_CREATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
});

export const getOrderDetails = createAsyncThunk('order/get order', async (id) => {
  try {
    const { data } = await axios.get(`/api/orders/${id}`);
    return data
  } catch (error) {
    console.log(error)
    // dispatch({
    //   type: ORDER_CREATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
});

export const payOrder = createAsyncThunk('order/pay order', async (orderId, paymentResult) => {
  try {
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult);
    return data
  } catch (error) {
    console.log(error)
    // dispatch({
    //   type: ORDER_CREATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
});

export const listMyOrders = createAsyncThunk('order/list my-orders', async (userInfo, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);
    return data
  } catch (error) {
    console.log(error)
    // dispatch({
    //   type: ORDER_CREATE_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderInfo : (state = {}, action) => {
      state.orderDetails = action.payload
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
      .addCase(listMyOrders.pending, (state) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
      .addCase(listMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true,
        state.order = action.payload
      })
      .addCase(listMyOrders.rejected, (state, action) => {
        state.loading = true;
        state.success = false,
        state.order = state.order
      })
  }
});
export const { setOrderInfo, setAddressInfo } = orderSlice.actions
export default orderSlice.reducer;
