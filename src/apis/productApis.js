import { toast } from "react-toastify";
import { axiosInstance } from "../axios";

const getProductsApi = async (successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.get("/product/");
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

const getCartApi = async (id, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.get(`/cart/${id}`);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

const getProductsByIdApi = async (id, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.get(`/product/get-by-id/${id}`);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

const createProductApi = async (body, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.post("/product/create", body);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

const addToCartApi = async (body, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.post("/cart/create", body);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

const updateCartApi = async (body, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.post("/cart/update", body);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

const checkoutCartApi = async (user_id, body, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.post(`cart/checkout/${user_id}`, body);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

const deleteItemFromCartApi = async (id, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.delete(`/cart/delete/${id}`);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error("Something went wrong", {
      autoClose: 3000,
    });
  }
};

export {
  getProductsApi,
  createProductApi,
  getProductsByIdApi,
  getCartApi,
  addToCartApi,
  updateCartApi,
  deleteItemFromCartApi,
  checkoutCartApi
};
