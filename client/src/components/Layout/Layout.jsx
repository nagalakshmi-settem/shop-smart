import { useLocation } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import ProductList from "../ProductList/ProductList"
import ProductDetail from "../ProductDetail/ProductDetail"
import CartPage from "../CartPage/CartPage"
import Register from "../Auth/Register"
import Login from "../Auth/Login"
import MyOrders from "../MyOrders/MyOrders"
import Wishlist from '../Wishlist/Wishlist'
import ProtectedRoute from '../ProtectedRoutes';

export default function Layout() {
  const location = useLocation();
  const hideNavbar = ['/register','/login'].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={ <ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>}/>
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      </Routes>
    </>
  );
}