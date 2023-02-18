import axios from "axios";

const domain =
  process.env.REACT_APP_API || "https://61a5e3c48395690017be8ed2.mockapi.io";
export const callAPI = async (path, method, data = {}) => {
  try {
    if (method === "GET") {
      const response = await axios.get(domain + path);
      if (response.status === 200) {
        return response.data;
      }
    } else if (method === "POST") {
      const response = await axios.post(domain + path, data);
      if (response.status === 201) {
        return response.data;
      }
    }else if (method === "PUT") {
      const response = await axios.put(domain + path, data);
      if (response.status === 200) {
        return response.data;
      }
    }else if (method === "DELETE") {
      const response = await axios.delete(domain + path);
      if (response.status === 200) {
        return response.data;
      }
    }
    return;
  } catch (error) {
   
  }
};
