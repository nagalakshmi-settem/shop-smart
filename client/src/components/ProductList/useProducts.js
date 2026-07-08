import { useState, useEffect, useTransition, useRef, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [isPending, startTransition] = useTransition();
  const [isSearching, setIsSearching] = useState(false);
  const isFirstLoad = useRef(true);

  // NEW — pagination state
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // NEW — reset page when search changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasNextPage(true);
  }, [search]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (isFirstLoad.current) {
          setLoading(true);
        } else if (page === 1) {
          setIsSearching(true);
        } else {
          setLoadingMore(true); // NEW
        }

        const res = await axiosInstance.get(
          `/products?page=${page}&limit=20&search=${search}` // ← page is now dynamic
        );

        startTransition(() => {
          // NEW — append if page > 1, replace if page 1
          setProducts(prev =>
            page === 1 ? res.data.products : [...prev, ...res.data.products]
          );
          setIsSearching(false);
          setLoadingMore(false); // NEW
        });

        setHasNextPage(res.data.hasNextPage); // NEW
        setLoading(false);
        isFirstLoad.current = false;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setIsSearching(false);
        setLoadingMore(false); // NEW
      }
    };
    getProducts();
  }, [search, page]); // ← added page as dependency

  // NEW — load next page
  const loadMore = useCallback(() => {
    if (hasNextPage && !loadingMore) {
      setPage(prev => prev + 1);
    }
  }, [hasNextPage, loadingMore]);

  const memoizedProducts = useMemo(() => products, [products]);

  return {
    products: memoizedProducts,
    loading,
    error,
    isPending,
    isSearching,
    loadingMore,     // NEW
    hasNextPage,      // NEW
    loadMore          // NEW
  };
};

export default useProducts;