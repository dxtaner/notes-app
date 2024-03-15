// NOTES APIS
import axios from "axios";
import { showErrorAlert } from "../utils/alerts";

const VITE_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
});

const getAuthorization = () => {
  const token = localStorage.getItem("online-notes");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
};

export const createNote = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/notes",
      payload,
      getAuthorization()
    );
    return response.data;
  } catch (error) {
    showErrorAlert(
      error.response?.data?.message || "Not oluşturulurken bir hata oluştu"
    );
    throw error;
  }
};

export const getAllNotes = () => {
  return axiosInstance
    .get("/notes", getAuthorization())
    .then((res) => res.data)
    .catch((error) => {
      showErrorAlert(
        error.response?.data?.message || "Notları alırken bir hata oluştu"
      );
      throw error;
    });
};

export const deleteNote = (id) => {
  return axiosInstance
    .delete(`/notes/${id}`, getAuthorization())
    .then((res) => res.data)
    .catch((error) => {
      showErrorAlert(
        error.response?.data?.message || "Not silinirken bir hata oluştu"
      );
      throw error;
    });
};

export const updateNote = (id, payload) => {
  return axiosInstance
    .patch(`/notes/${id}`, payload, getAuthorization())
    .then((res) => res.data)
    .catch((error) => {
      showErrorAlert(
        error.response?.data?.message || "Not güncellenirken bir hata oluştu"
      );
      throw error;
    });
};
