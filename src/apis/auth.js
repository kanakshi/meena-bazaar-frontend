import { toast } from "react-toastify";
import { axiosInstance } from "../axios";

const authApi = async (body, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.post("/auth/login-user", body);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error(error.response.data.msg || "Something went wrong", {
      autoClose: 3000,
    });
  }
};

const registerApi = async (body, successCallback, errorCallback) => {
  try {
    let response = await axiosInstance.post("/auth/register-user", body);
    successCallback(response);
  } catch (error) {
    errorCallback(error);
    console.log(error);
    toast.error(error.response.data || "Something went wrong", {
      autoClose: 3000,
    });
  }
};

export { authApi, registerApi };
