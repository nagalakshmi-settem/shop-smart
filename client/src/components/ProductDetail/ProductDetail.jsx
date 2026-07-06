import { useParams, useNavigate } from 'react-router-dom';
import useProduct from './useProduct';
import useWishlist from '../../hooks/useWishlist';
import useCart from '../../hooks/useCart';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);

  // Cart — using useCart hook now
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(id);

  // Wishlist
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(id);

  const handleAddToCart = () => {
    if (product && !inCart) {
      addToCart(id);
    }
  };

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-500 animate-pulse">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-red-500">Error: {error}</div>
    </div>
  );

  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg p-6">

        <button
          onClick={() => navigate('/')}
          className="text-[#2874f0] text-sm mb-6 hover:underline"
        >
          ← Back to Products
        </button>

        <div className="flex flex-col md:flex-row gap-8">

          {/* Image */}
          <div className="w-full md:w-80 flex flex-col items-center">
            <div className="text-[120px] h-64 flex items-center justify-center">
              {product.image || '📦'}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 w-full">
              <button
                onClick={handleAddToCart}
                disabled={inCart}
                className={`flex-1 py-3 rounded font-semibold text-sm
                  ${inCart
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#ff9f00] hover:bg-[#e68f00] text-white'
                  }`}
              >
                {inCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>

              <button
                onClick={handleWishlist}
                className={`px-4 py-3 rounded font-semibold text-sm border transition-colors
                  ${wishlisted
                    ? 'bg-red-50 border-red-300 text-red-500'
                    : 'border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500'
                  }`}
              >
                {wishlisted ? '❤️' : '🤍'}
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="flex-1 py-3 rounded font-semibold text-sm bg-[#2874f0] hover:bg-[#1a5dc7] text-white"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <span className="text-xs text-gray-400 uppercase">{product.category}</span>
            <h1 className="text-xl font-medium text-gray-800 mt-1">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-600 text-white text-sm px-2 py-0.5 rounded">
                  {product.rating} ★
                </span>
                <span className="text-sm text-gray-500">
                  {product.ratingCount?.toLocaleString()} ratings
                </span>
              </div>
            )}

            <hr className="my-4" />

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-green-600 font-medium">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            <div className="mt-3">
              {product.inStock
                ? <span className="text-green-600 text-sm font-medium">● In Stock</span>
                : <span className="text-red-500 text-sm font-medium">● Out of Stock</span>
              }
            </div>

            {product.description && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Available Offers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>🏦 10% off on HDFC Bank Cards</li>
                <li>💳 No cost EMI on orders above ₹3,000</li>
                <li>🔄 10 day easy return policy</li>
                <li>🚚 Free delivery on orders above ₹499</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}