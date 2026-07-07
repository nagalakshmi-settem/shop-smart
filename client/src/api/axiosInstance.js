import axios from "axios";
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';
import { setProducts } from '../redux/wishlistSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear Redux state
      store.dispatch(logout());
      store.dispatch(clearCart());
      store.dispatch(setProducts([]));
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;