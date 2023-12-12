import axios from "axios";
import { serverUrl } from "../../../constants/base_urls";

const postAddress = async (data) => {
  console.log(data)
  const response = await axios.post(`${serverUrl}address`, data);

  return response.data;
};

const fetchAddress = async (userId) => {
  const response = await axios.get(`${serverUrl}address/${userId}`);

  return response.data;
};

const editAddress = async () => {
  const response = await axios.put(`${serverUrl}address/${userId}`);

  return response.data;
};

const addressService = {
  fetchAddress,
  postAddress,
  editAddress
};

export default addressService;
