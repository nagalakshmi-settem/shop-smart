import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { setProducts, setLoading, setError } from '../redux/wishlistSlice';

const useWishlist = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.wishlist);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axiosInstance.get("/wishlist");
        dispatch(setProducts(res.data.products));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      }
    };
    fetchWishlist(); // ← call it here
  }, []);

  const addToWishlist = useCallback(async (productId) => {
    try {
      const res = await axiosInstance.post(`/wishlist/${productId}`);
      dispatch(setProducts(res.data.products));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  const removeFromWishlist = useCallback(async (productId) => {
    try {
      const res = await axiosInstance.delete(`/wishlist/${productId}`);
      dispatch(setProducts(res.data.products));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  const isWishlisted = useCallback((productId) => {
    return products.some(p => p._id === productId);
  }, [products]);

  return { products, loading, error, addToWishlist, removeFromWishlist, isWishlisted };
};

export default useWishlist;