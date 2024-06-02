import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch reviews
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const response = await axios.get('http://localhost:8000/api/reviews/');
    return response.data;
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default reviewsSlice.reducer;
