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
  return client.get(`api/user-products/${id}`)
}
