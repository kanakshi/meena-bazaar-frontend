import { toast } from "react-toastify";
import { axiosInstance } from "../axios";

const getOrdersApi = async (user_id, successCallback, errorCallback) => {
    try {
      let response = await axiosInstance.get(`/order/${user_id}`);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
      console.log(error);
      toast.error("Something went wrong", {
        autoClose: 3000,
      });
    }
  };

  const deleteOrderApi = async (id, successCallback, errorCallback) => {
    try {
      let response = await axiosInstance.delete(`/order/delete/${id}`);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
      console.log(error);
      toast.error("Something went wrong", {
        autoClose: 3000,
      });
    }
  };

  export {getOrdersApi, deleteOrderApi}