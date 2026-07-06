import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return { product, loading, error };
};

export default useProduct;