// src/utils/Api.js
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const Api = {
  login: `${BASE_URL}/login`,
  signup: `${BASE_URL}/signup`,
  getCart: `${BASE_URL}/getcart`,
  addToCart: `${BASE_URL}/addtocart`,
  removeFromCart: `${BASE_URL}/removefromcart`,
  getAllProducts: `${BASE_URL}/allproducts`,
  newcollection: `${BASE_URL}/newcollection`,
  // Add other endpoints as needed...
};

export default Api;
