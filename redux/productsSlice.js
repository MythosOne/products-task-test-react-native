import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// import { fetchProducts, addProduct } from './operations';

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://fakestoreapi.com';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/products/?limit=18');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// export const fetchProducts = createAsyncThunk(
//   'products/fetchAll',
//   async function () {
//     const cards = await axios.get(`${axios.defaults.baseURL}/?limit=5`);
//     return cards.data;
//   }
// );

// export const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     items: productsinitialState,
//   },
//   reducers: {
//     addProducts(state, action) {
//       state.items.push(action.payload);
//     },
//   },
// });
// ----------------------------------------------------------------
// export const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     items: [],
//     status: null,
//     error: null,
//   },
//     extraReducers: {
//       [fetchProducts.pending]: state => {
//         state.status = 'loading';
//         state.error = null;
//       },
//       [fetchProducts.fulfilled]: (state, action) => {
//         state.status = 'resolved';
//         state.items = action.payload;
//       },
//       [fetchProducts.rejected]: (state, action) => {},
//     },
//     reducers: {
//       addProducts(state, action) {
//         state.items.push(action.payload);
//       },
//   },
// });

// ---------------------------------------------------------------

const extraActions = [fetchProducts];
// const extraActions = [fetchProducts, addProduct];
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
        // .addCase(addProduct.fulfilled, (state, action) => {
        //   state.items.push(action.payload);
        // })
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

// ---------------------------------------------------------------
export const { addProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
