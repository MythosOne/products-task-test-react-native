import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/products');
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const addProduct = createAsyncThunk(
    'products/addProducts',
    async (newProduct, thunkAPI) => {
      try {
        const response = await axios.post('/products', newProduct);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );