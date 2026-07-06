import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { logout } from '../../redux/authSlice';
import axiosInstance from '../../api/axiosInstance';
import { setProducts } from '../../redux/wishlistSlice';
import { clearCart, setCart } from "../../redux/cartSlice"
 export default function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
const wishlistItems = useSelector(state => state.wishlist.products);

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate(`/?search=${debouncedSearch}`);
    }
  }, [debouncedSearch]);
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const [cartRes, wishlistRes] = await Promise.all([
        axiosInstance.get('/cart'),
        axiosInstance.get('/wishlist'),
      ]);
      dispatch(setCart({ 
        items: cartRes.data.items, 
        total: cartRes.data.total 
      }));
      dispatch(setProducts(wishlistRes.data.products));
    } catch (err) {
      // user not logged in — ignore
    }
  };
  if (isAuthenticated) {
    fetchUserData();
  }
}, [isAuthenticated]);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(setProducts([]))
    navigate('/login');
  };

  return (
    <nav className="bg-[#2874f0] px-6 py-3 flex items-center gap-4 sticky top-0 z-50 shadow-md">
      <Link to="/" className="text-white text-xl font-bold min-w-fit">
        Shop<span className="text-yellow-300">Smart</span>
      </Link>

      <div className="flex flex-1 bg-white rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className="flex-1 px-3 py-2 text-sm outline-none text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-[#ff9f00] px-4 text-white text-sm font-medium hover:bg-[#e68f00]">
          🔍
        </button>
      </div>

      <div className="flex items-center gap-6 min-w-fit">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-white text-sm font-medium">
              Hi, {user?.name}
            </span>
            <Link to="/orders" className="text-white text-sm font-medium hover:text-yellow-300">
              My Orders
            </Link>
<Link to="/wishlist" className="relative text-white text-sm font-medium hover:text-yellow-300">
  🤍 Wishlist
  {wishlistItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
      {wishlistItems.length}
    </span>
  )}
</Link>
            <button
              onClick={handleLogout}
              className="text-white text-sm font-medium hover:text-yellow-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white text-sm font-medium hover:text-yellow-300">
            Login
          </Link>
        )}

  <Link to="/cart" className="relative text-white flex items-center gap-1 text-sm">
  <span className="text-lg">🛒</span>
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
      {cartItems.length}
    </span>
  )}
  <span>Cart</span>
</Link>
      </div>
    </nav>
  );
}