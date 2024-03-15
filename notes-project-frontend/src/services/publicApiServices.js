import axios from "axios";
import { showErrorAlert } from "../utils/alerts";

const VITE_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
});

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("auth/register", payload);
    return response.data;
  } catch (error) {
    showErrorAlert(
      error.response?.data?.message || "Beklenmeyen bir hata oluştu"
    );
    throw error;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("auth/login", payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      showErrorAlert(error.response.data.message || "Bir hata oluştu");
    } else {
      showErrorAlert("Beklenmeyen bir hata oluştu");
    }
    throw error;
  }
};
