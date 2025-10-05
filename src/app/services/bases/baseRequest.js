import axiosInstance from "./axios";

export const apiGet = async (url, config = {}) => {
  const res = await axiosInstance.get(url, config);
  return res.data;
};

export const apiPost = async (url, data = {}, config = {}) => {
  const res = await axiosInstance.post(url, data, config);
  return res.data;
};

export const apiPut = async (url, data = {}, config = {}) => {
  const res = await axiosInstance.put(url, data, config);
  return res.data;
};

export const apiDelete = async (url, config = {}) => {
  const res = await axiosInstance.delete(url, config);
  return res.data;
};
