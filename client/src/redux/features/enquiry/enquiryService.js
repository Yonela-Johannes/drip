import axios from "axios";
import { serverUrl } from "../../../constants/base_urls";

const getEnquiries = async () => {
  const response = await axios.get(`${serverUrl}enquiry/`);

  return response.data;
};
const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${serverUrl}enquiry/${id}`);
  return response.data;
};
const getEnquiry = async (id) => {
  const response = await axios.get(`${serverUrl}enquiry/${id}`);
  return response.data;
};
const udpateEnquiry = async (enq) => {
  const response = await axios.put(
    `${serverUrl}enquiry/${enq.id}`,
    { status: enq.enqData },
  );
  return response.data;
};
const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  udpateEnquiry,
};

export default enquiryService;
