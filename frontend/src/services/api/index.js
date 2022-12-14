import client from "./client";

export const getUser = () => {
  return client.get("api/users");
};

export const signup = (body) => {
  return client.post("api/signup", body);
};

export const login = (body) => {
  return client.post("api/login", body);
};

export const refreshToken = (body) => {
  return client.post("auth/refresh-token", body);
};

export const getUserInformation = (id) => {
  return client.get(`api/user-information/${id}`);
};

export const updateUserInformation = (id, body) => {
  return client.patch(`api/user-update-information/${id}`, body);
};

export const getUserProducts = (id) => {
  return client.get(`api/user-products/${id}`);
};

export const updateUserProducts = (userId, productId, body) => {
  return client.patch(`api/user-products/${userId}/product/${productId}`, body);
};

export const addUserProducts = (userId, body) => {
  return client.post(`api/user-products/${userId}`, body);
};

export const deleteProduct = (productId) => {
  return client.delete(`api/user-products/${productId}`)
}