import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setProducts(state, { payload }) {
      state.products = payload;
    },
  },
  extraReducers(builder) {},
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
