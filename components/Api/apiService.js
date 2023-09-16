import axios from "axios";

axios.defaults.baseURL = "https://fakestoreapi.com/products";

export async function apiService() {
  const cards = await axios.get(`${axios.defaults.baseURL}`);

  return cards.data;
}
