import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized occurs on an admin route, redirect to admin login
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && currentPath !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);
