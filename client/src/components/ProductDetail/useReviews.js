import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';

const useReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/reviews/${productId}`);
        setReviews(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  // Add a review
  const addReview = useCallback(async (rating, comment) => {
    const res = await axiosInstance.post(`/reviews/${productId}`, {
      rating,
      comment
    });
    setReviews(prev => [res.data, ...prev]); // add to top
    return res.data;
  }, [productId]);

  return { reviews, loading, error, addReview };
};

export default useReviews;