import axios from "axios";
import client from "./api/client";

export const getProvincesAndDistrict = () => {
  return axios.get("https://provinces.open-api.vn/api/?depth=2 ");
};

export const postImage = (body) => {
  return client.post("api/post-image", body);
};