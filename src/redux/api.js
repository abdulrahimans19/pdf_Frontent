import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:4001/api",
});

Instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("pdf_extract"));
    if (token?.token) {
      config.headers["Authorization"] = "Bearer " + token?.token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
    console.log(error);
  }
);

const Instanceds = axios.create({
  baseURL: "http://localhost:4001/api",
});

Instanceds.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("pdf_extract"));
    if (token?.token) {
      config.headers["Authorization"] = "Bearer " + token?.token;
    }
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    Promise.reject(error);
    console.log(error);
  }
);

// Update your signIn function in api.js to handle the token and save it to localStorage
export const signIn = async (formData) => {
  try {
    const response = await Instance.post("/auth/signIn", formData);
    const { token } = response.data; // Assuming the token is returned in the response
    localStorage.setItem("pdf_extract", JSON.stringify({ token }));
    return response; // You can return the entire response if needed
  } catch (error) {
    // Handle login error here
    throw error;
  }
};
export const uploadFile = (formData) =>
  Instanceds.post("/file/upload", formData);
export const listFile = (formData) => Instance.get("/file/list", formData);
export const extractFile = (formData) =>
  Instance.post("/file/extract", formData);
export const deleteFile = (formData) => Instance.post("/file/delete", formData);
