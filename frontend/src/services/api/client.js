import axios from "axios";
import store from "../../redux/store";
import { refreshToken } from "./index";
import { setAuth, updateAuth } from "../../redux/userReducer";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});

client.interceptors.request.use(
  (config) => {
    const token = store.getState().user?.auth?.access_token || "";
    if (token) {
      delete config.headers["x-access-token"];
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      if (error.request?.responseURL?.indexOf("/refresh-token") < 0) {
        return (
          refreshToken(store.getState().user.auth)
            .then((res) => {
              store.dispatch(updateAuth(res.data));
              error.response.config.headers["x-access-token"] =
                res.data.access_token;
              return axios(error.response.config);
            })
        );
      } else {
        store.dispatch(setAuth(null));
        window.open(`${process.env.REACT_APP_API_URL}auth/logout`, "_self");
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default client;
