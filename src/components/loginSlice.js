import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, register, updateProfile } from './loginAPI';
import { jwtDecode } from 'jwt-decode'; // Adjusted import statement to use named export

const initialState = {
  status: 'idle',
  access: localStorage.getItem('access') || "",
  userName: localStorage.getItem('userName') || "",
  admin: localStorage.getItem('admin') === 'true' || false,
  logged: localStorage.getItem('logged') === 'true' || false,
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      return response.data;
    } catch (error) {
      // Return the error message along with the rejected value
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'login/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response.data;
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid registration details.';
        } else if (error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProfileAsync = createAsyncThunk(
  'login/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    test: () => {
      console.log("testttttttttttttttttt");
    },
    logout: (state) => {
      state.access = "";
      state.userName = "";
      state.admin = false;
      state.logged = false;

      // Clear login information from localStorage
      localStorage.removeItem('access');
      localStorage.removeItem('userName');
      localStorage.removeItem('admin');
      localStorage.removeItem('logged');
    },
    incrementByAmount: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.access = action.payload.access;
        state.userName = jwtDecode(action.payload.access).username;
        state.admin = jwtDecode(action.payload.access).isSuper;
        state.logged = true;

        // Store login information in localStorage
        localStorage.setItem('access', action.payload.access);
        localStorage.setItem('userName', state.userName);
        localStorage.setItem('admin', state.admin);
        localStorage.setItem('logged', true);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // Handle rejected login attempts (errors)
        state.status = 'idle';
        console.error("Login error:", action.payload); // Log the error
        // Store the error message in the state
        state.errorMessage = action.payload?.error || "An error occurred. Please try again.";
        // Clear any stored user information
        state.access = "";
        state.userName = "";
        state.admin = false;
        state.logged = false;
      })
      .addCase(updateProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfileAsync.fulfilled, (state) => {
        state.status = 'idle';
        // Handle successful update profile action
        // For example, update user information in state if needed
      })
      .addCase(updateProfileAsync.rejected, (state) => {
        state.status = 'idle';
        // Handle update profile action failure
        // For example, display an error message to the user
      });
  }
});

export const { test, logout, incrementByAmount } = loginSlice.actions;
export const selectStatus = (state) => state.login.status;
export const selectUsername = (state) => state.login.userName;
export const selectLogged = (state) => state.login.logged;
export const selectAdmin = (state) => state.login.admin;

export default loginSlice.reducer;
