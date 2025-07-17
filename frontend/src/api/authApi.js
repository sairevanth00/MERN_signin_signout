import axios from "axios";
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    withCredentials: true // Only if your backend sets cookies
});

export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);
export const sendOtp = (email) => API.post("/auth/send-otp", { email });
export const verifyOtp = (data) => API.post("/auth/verify-otp", data);
export const getUser = (token) =>
  API.get("/user/me", { headers: { Authorization: `Bearer ${token}` } });
export const updatePassword = (data, token) =>
  API.put("/user/update-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
