import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchProducts, addProduct } from "./operations";

const extraActions = [fetchProducts, addProduct];
const getActions = (type) => extraActions.map((action) => action[type]);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    return builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addMatcher(isAnyOf(...getActions("pending")), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(...getActions("rejected")), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(isAnyOf(...getActions("fulfilled")), (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },

});

export const productsReducer = productsSlice.reducer;
