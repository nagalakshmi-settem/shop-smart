import { useNavigate } from 'react-router-dom';
import useWishlist from '../../hooks/useWishlist';
import useCart from '../../hooks/useCart';

export default function Wishlist() {
  const navigate = useNavigate();
  const { products, loading, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-500 animate-pulse">Loading wishlist...</div>
    </div>
  );

  if (products.length === 0) return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <div className="text-6xl">🤍</div>
      <h2 className="text-xl font-medium text-gray-700">Your wishlist is empty</h2>
      <p className="text-gray-400 text-sm">Save items you love</p>
      <button
        onClick={() => navigate('/')}
        className="bg-[#2874f0] text-white px-8 py-3 rounded font-medium hover:bg-[#1a5dc7]"
      >
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 px-2">
          My Wishlist ({products.length} items)
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.map(product => {
            const inCart = isInCart(product._id);
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div key={product._id} className="bg-white rounded-lg p-3 shadow-sm">
                <div
                  className="text-5xl h-24 flex items-center justify-center cursor-pointer"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.image || '📦'}
                </div>

                <p
                  className="text-sm text-gray-700 font-medium line-clamp-2 mt-2 cursor-pointer hover:text-[#2874f0]"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {product.name}
                </p>

                <div className="flex items-baseline gap-1 mt-1 flex-wrap">
                  <span className="text-sm font-semibold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-green-600 font-medium">
                      {discount}% off
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      if (!inCart) addToCart(product._id); // ← useCart hook
                      removeFromWishlist(product._id);
                      navigate('/cart');
                    }}
                    className={`flex-1 py-2 rounded text-xs font-semibold
                      ${inCart
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-[#ff9f00] text-white hover:bg-[#e68f00]'
                      }`}
                  >
                    {inCart ? '✓ In Cart' : '🛒 Add'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="px-2 py-2 rounded text-xs border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}