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
