import axios from 'axios';
import { supabase } from "./supabaseClient";

// Common setting for API requests
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT token
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve the token from local storage or another secure storage
      const { data, error } = await supabase.auth.getSession();
      if (error) { throw error; }

      // If the token exists, add it to the Authorization header
      const token = data?.session?.access_token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;