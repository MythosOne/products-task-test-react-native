// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = "https://fakestoreapi.com";

// export const fetchProducts = createAsyncThunk(
//     'products/fetchAll',
//     async (_, thunkAPI) => {
//       try {
//         const response = await axios.get('/products');
//         return response.data;
//       } catch (e) {
//         return thunkAPI.rejectWithValue(e.message);
//       }
//     }
//   );

//   export const addProduct = createAsyncThunk(
//     'products/addProducts',
//     async (newProduct, thunkAPI) => {
//       try {
//         const response = await axios.post('/products', newProduct);
//         return response.data;
//       } catch (e) {
//         return thunkAPI.rejectWithValue(e.message);
//       }
//     }
//   );
