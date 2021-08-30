import Axios from "axios";
import api from "../config";

export const axiosInstance = Axios.create({
  // timeout: 10000,
  baseURL: api,
});

//add token to all request
axiosInstance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("x-access-token");
  config.headers["x-access-token"] = token;
  return config;
});

axiosInstance.interceptors.response.use(
  //handle on success
  function(response) {
    return response?.data || null;
  },

  //handle on error
  function(error) {
    if (error?.response?.data) {
    } else {
      return Promise.reject({
        status: 0,
        error: { message: error.message || "Looks like internet is not available, please try again" },
      });
    }
    return Promise.reject({
      status: error?.response?.status,
      error: error?.response?.data,
    });
  }
);
