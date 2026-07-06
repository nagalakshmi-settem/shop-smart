import { useState,useEffect, useTransition } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useRef } from "react";
import { useMemo } from "react";

const useProducts = () =>{
const [products,setProducts] = useState([]);
const [error,setError] = useState(null);
const[loading,setLoading] = useState(true);
  const [searchParams] = useSearchParams();
const search = searchParams.get('search')||'';
const [isPending,startTransition] = useTransition();
  const [isSearching, setIsSearching] = useState(false);
const isFirstLoad = useRef(true);
useEffect(()=>{
    const getProducts = async()=>{
        try{
             if (isFirstLoad.current) {
          setLoading(true);
        } else {
          setIsSearching(true);
        }
        const res = await axiosInstance.get(`/products?page=1&limit=20&search=${search}`)
        startTransition(()=>{
        setProducts(res.data);
        })
        setLoading(false);
        isFirstLoad.current = false;
        }catch(err){
            setError(err.message)
                    setLoading(false);
                    setIsSearching(false)

        }
    }
    getProducts();
},[search])
const memoizedProducts = useMemo(()=>products,[products])
 return {products: memoizedProducts,loading,error,isPending,isSearching}

}
export default useProducts;