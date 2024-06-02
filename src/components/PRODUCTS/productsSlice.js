import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProds, addProd, removeProd, updateProd } from './productsAPI';

const initialState = {
  total: 0,
  status: 'idle',
  prods: []
};

export const getProdsAsync = createAsyncThunk(
  'prod/getProds',
  async () => {
    const response = await getProds();
    return response.data;
  }
);

export const addProdAsync = createAsyncThunk(
  'prod/addProd',
  async ({ name, description, price, imageFile }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', imageFile);
    const response = await addProd(formData);
    return response.data;
  }
);

export const removeProdAsync = createAsyncThunk(
  'prod/removeProd',
  async (prodId) => {
    await removeProd(prodId);
    return prodId; // Return the ID of the removed product
  }
);

export const updateProdAsync = createAsyncThunk(
  'prod/updateProd',
  async ({ prodId, updatedProd }) => {
    await updateProd(prodId, updatedProd);
    return { prodId, updatedProd };
  }
);

export const prodSlice = createSlice({
  name: 'prod',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProdsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProdsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.prods = action.payload;
      })
      .addCase(addProdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.prods.push(action.payload);
      })
      .addCase(removeProdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.prods = state.prods.filter((prod) => prod.id !== action.payload);
      })
      .addCase(updateProdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { prodId, updatedProd } = action.payload;
        const index = state.prods.findIndex((prod) => prod.id === prodId);
        if (index !== -1) {
            // Instead of replacing the entire product object, update individual fields
            state.prods[index].name = updatedProd.name;
            state.prods[index].description = updatedProd.description;
            state.prods[index].price = updatedProd.price;
            state.prods[index].image = updatedProd.image;
        }
    });
  },
});

export const { increment } = prodSlice.actions;
export const selectProds = (state) => state.prod.prods;
export default prodSlice.reducer;
