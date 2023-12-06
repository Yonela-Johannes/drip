import axios from "axios";
import { serverUrl } from "../../../constants/base_urls";

const getUsers = async () => {
  const response = await axios.get(`${serverUrl}user/all-users`);

  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
