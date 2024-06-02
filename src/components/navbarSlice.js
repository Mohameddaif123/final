// navbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    isNavbarOpen: false,
  },
  reducers: {
    toggleNavbar: state => {
      state.isNavbarOpen = !state.isNavbarOpen;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
