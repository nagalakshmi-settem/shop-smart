import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { setCart, setLoading, setError, clearCart } from '../redux/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const { items, total, loading, error } = useSelector(state => state.cart);

  const addToCart = useCallback(async (productId) => {
    try {
      const res = await axiosInstance.post(`/cart/${productId}`);
      dispatch(setCart({ items: res.data.items, total: res.data.total }));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const res = await axiosInstance.delete(`/cart/${productId}`);
      dispatch(setCart({ items: res.data.items, total: res.data.total }));
    } catch (err) {
      dispatch(setError(err.message));
    }
  }, [dispatch]);

  const isInCart = useCallback((productId) => {
    return items.some(item => item.product?._id === productId);
  }, [items]);

  return { items, total, loading, error, addToCart, removeFromCart, isInCart };
};

export default useCart;