import axios from "axios";

axios.defaults.baseURL = "https://fakestoreapi.com/products";

export async function apiService() {
  const cards = await axios.get(`${axios.defaults.baseURL}/?limit=3`);

  return cards.data;
}
