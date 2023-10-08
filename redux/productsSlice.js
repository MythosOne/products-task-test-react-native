import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchProducts } from './operations';

const extraActions = [fetchProducts];
const getActions = type => extraActions.map(action => action[type]);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    return (
      builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.items = action.payload;
        })
        .addMatcher(isAnyOf(...getActions('pending')), state => {
          state.isLoading = true;
        })
        .addMatcher(isAnyOf(...getActions('rejected')), (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        .addMatcher(isAnyOf(...getActions('fulfilled')), state => {
          state.isLoading = false;
          state.error = null;
        })
    );
  },
  reducers: {
    addProducts(state, action) {
      state.items.push(action.payload);
    },
  },
});


export const { addProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
