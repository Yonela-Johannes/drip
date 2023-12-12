import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "./addressService";

export const getAddress = createAsyncThunk(
  "address/get-address",
  async (userId, thunkAPI) => {
    try {
      return await addressService.fetchAddress(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/create-address",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      return await addressService.postAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update-address",
  async (thunkAPI) => {
    try {
      return await addressService.editAddress();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  address: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
  },
});

export default addressSlice.reducer;
