import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userCredentials) => {
    const request = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      userCredentials,
    );
    const response = await request.data;
    localStorage.setItem('ecomadmin', JSON.stringify(response));
    return response;
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('ecomadmin');
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.token = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        
        // const decodedUser = jwtDecode(action.payload.token);
       
        state.user = "admin";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Clear user state on logout
        state.error = null;
        state.token = null;
      });
  },
});

export default userSlice.reducer;
