import axios from "axios";
import { serverUrl } from "../../../constants/base_urls";

const login = async (user) => {
  const response = await axios.post(`${serverUrl}login`, user);
  return response.data;
};

const register = async (data) => {
  const response = await axios.post(`${serverUrl}register`, data);
  return response.data;
};

const edit = async (userId, data) => {
  const response = await axios.put(`${serverUrl}me/${userId}`, data);
  return response.data;
};

const fetchUser = async (userId) => {
  const response = await axios.get(`${serverUrl}me/${userId}`);
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${serverUrl}user/all-orders`, config);
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(`${serverUrl}user/order/${id}`);
  return response.data;
};

const addWish = async (id, productId) => {
  const response = await axios.put(`${serverUrl}add-wishlist/${id}`, {productId: productId});
  return response.data;
};

const removeWish = async (userId, productId) => {
  const response = await axios.delete(`${serverUrl}remove-wishlist/${userId}/${productId}`);
  return response.data;
};

const getWish = async (userId) => {
  const response = await axios.get(`${serverUrl}wishlist/${userId}`);
  return response.data;
};

const authService = {
  login,
  register,
  getOrders,
  getOrder,
  addWish,
  removeWish,
  getWish,
  edit,
  fetchUser,
};

export default authService;
