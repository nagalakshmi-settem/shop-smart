import axios from "axios";
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';
import { setProducts } from '../redux/wishlistSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials:true,
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

  async (error) => {
    const originalRequest = error.config;
if (
  error.response?.status === 401 &&
  !originalRequest?._retry &&
  !originalRequest?.url?.includes("/refresh-token")
) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:3000/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        store.dispatch(logout());
        store.dispatch(clearCart());
        store.dispatch(setProducts([]));

        localStorage.removeItem("token");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;