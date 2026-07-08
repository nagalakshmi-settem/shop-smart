import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        // Fetch both at the same time using Promise.all
        const [ordersRes, statsRes,categoryRes] = await Promise.all([
          axiosInstance.get('/orders/my'),
          axiosInstance.get('/orders/stats'),
           axiosInstance.get('/orders/category-stats'),
        ]);
        setOrders(ordersRes.data);
        setStats(statsRes.data);
        setCategoryStats(categoryRes.data);
        setLoading(false);
      } catch(err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  return { orders, stats, categoryStats,error, loading };
};

export default useOrders;