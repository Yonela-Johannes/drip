import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openSignIn: false,
  openSignup: false,
  openUserModal: false,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onCloseSignin : (state) => {
      state.openSignIn = false
      state.openSignup = false
      state.openUserModal = false
    },
    handleSignin : (state) => {
      state.openSignup = false
      state.openUserModal = false
      state.openSignIn = true
    },
    handleSignup : (state) => {
      state.openSignIn = false
      state.openUserModal = false
      state.openSignup = true
    },
    handleUserModal : (state) => {
      state.openSignup = false
      state.openSignIn = false
      state.openUserModal = true
    },
  },
});
export const { onCloseSignin, handleSignin, handleSignup,
handleUserModal } = modalsSlice.actions;
export default modalsSlice.reducer;
