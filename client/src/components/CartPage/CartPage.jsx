import useCart from '../../hooks/useCart';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartSlice';

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cartItems, total: cartTotal, removeFromCart } = useCart();

  const handlePlaceOrder = async () => {
    try {
      const items = cartItems.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      await axiosInstance.post("/orders", {
        items,
        totalAmount: cartTotal,
      });

      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order. Please login.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg px-6 py-4 mb-3 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-medium text-gray-800">Shopping Cart</h1>
            <p className="text-sm text-gray-500">{cartItems.length} items</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-[#2874f0] text-sm hover:underline"
          >
            ← Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-16 flex flex-col items-center gap-4">
            <div className="text-8xl">🛒</div>
            <h2 className="text-xl font-medium text-gray-700">Your cart is empty</h2>
            <p className="text-gray-400 text-sm">Add items to it now</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#2874f0] text-white px-8 py-3 rounded font-medium hover:bg-[#1a5dc7]"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-3">

            {/* Cart items */}
            <div className="flex-1 space-y-3">
              {cartItems.map(item => (
                <div key={item.product._id} className="bg-white rounded-lg p-4 flex gap-4">

                  {/* Image */}
                  <div className="text-5xl w-20 h-20 flex items-center justify-center flex-shrink-0">
                    {item.product.image || '📦'}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">
                      {item.product.category}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Qty: {item.quantity}
                    </p>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{item.product.price.toLocaleString()}
                      </span>
                      {item.product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.product.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            {Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>

                    <p className={`text-xs mt-1 font-medium ${item.product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                      {item.product.inStock ? '● In Stock' : '● Out of Stock'}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-gray-400 hover:text-red-500 text-xs self-start mt-1"
                  >
                    ✕ Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Price summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-lg p-4 sticky top-20">
                <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-4">
                  Price Details
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price ({cartItems.length} items)</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total Amount</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-6 bg-[#ff9f00] hover:bg-[#e68f00] text-white py-3 rounded font-semibold text-sm"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}