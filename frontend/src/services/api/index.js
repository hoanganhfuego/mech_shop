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
  return client.post("api/refresh-token", body);
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

export const updateUserProducts = (user_id, product_id, body) => {
  return client.patch(
    `api/user-products/${user_id}/product/${product_id}`,
    body
  );
};

export const addUserProducts = (user_id, body) => {
  return client.post(`api/user-products/${user_id}`, body);
};

export const deleteProduct = (product_id) => {
  return client.delete(`api/user-products/${product_id}`);
};

export const getAllProducts = (
  { type = 0, page = 1, sort_price = undefined, product_condition = undefined },
  user_id
) => {
  return client.get(
    `api/all-products/?type=${type}&page=${page}&user_id=${user_id}&sort_price=${sort_price}&product_condition=${product_condition}`
  );
};

// login with google
export const getGoogleUserInfo = (credentials) => {
  return client.get("auth/login/success", credentials);
};

export const logoutGoogle = (credentials) => {
  return client.get("auth/logout", credentials);
};

//cart
export const getUserCart = (user_id, page = 0, rows_per_page = 5) => {
  return client.get(
    `api/cart-products/${user_id}/?page=${page}&rows_per_page=${rows_per_page}`
  );
};

export const addToCart = (user_id, product_id, body) => {
  return client.post(
    `api/cart-products/user/${user_id}/product/${product_id}`,
    body
  );
};

export const deleteCart = (cartIds) => {
  return client.delete(`api/cart-products/delete/?cart_id=${cartIds}`);
};

export const updateCartQuantity = (cart_id, quantity) => {
  return client.patch(
    `api/cart-products/cart_id/${cart_id}/quantity/${quantity}`
  );
};

//order
export const placeOrder = (orders) => {
  return client.post("api/checkout-order", orders);
};

export const getUserOrder = (user_id) => {
  return client.get(`api/user-order/${user_id}`);
};
