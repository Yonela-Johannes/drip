import axios from "axios";
import { serverUrl } from "../../../constants/base_urls";

const getProductCategories = async () => {
  const response = await axios.get(`${serverUrl}category/`);

  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(`${serverUrl}category/`, category);

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${serverUrl}category/${id}`);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${serverUrl}category/${id}`);

  return response.data;
};
const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${serverUrl}category/${category.id}`,
    { title: category.pCatData.title }
  );

  return response.data;
};
const categoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  deleteProductCategory,
  updateProductCategory,
};

export default categoryService;
