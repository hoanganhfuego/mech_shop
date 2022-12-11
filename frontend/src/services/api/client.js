import axios from "axios";
import store from "../../redux/store";
import { refreshToken } from "./index";
import { setAuth, updateAuth } from "../../redux/userReducer";
import Path from "../../route/Path";

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
    const status = error.response.status;
    const reset = error.response.data.reset_refesh_token || null
    if(reset) {
      store.dispatch(setAuth(null))
      return window.location.href = Path.login
    }
    if (status !== 401) {
      return Promise.reject(error);
    } else {
      return refreshToken(store.getState().user.auth)
        .then((res) => {
          store.dispatch(updateAuth(res.data));
          error.response.config.headers["x-access-token"] =
            res.data.access_token;
          return axios(error.response.config);
        })
        // .catch((err) => {
        //   console.log("co loi", err)
        //   store.dispatch(setAuth(null));
        //   return Promise.reject(err);
        // });
    }
  }
);

export default client;
