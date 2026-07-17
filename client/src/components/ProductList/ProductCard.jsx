import { Link } from 'react-router-dom';
import { memo } from 'react';
const discount = (price, original) =>
  Math.round(((original - price) / original) * 100);

 const ProductCard = memo(function ProductCard({ product }){
    // console.log('ProductCard rendered:', product.name); // ← add this
  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-white p-3 hover:shadow-lg transition-shadow cursor-pointer no-underline block"
    >
      {/* Image */}
      <div className="h-36 flex items-center justify-center text-6xl mb-3">
        {product.image || '📦'}
      </div>

      {/* Name */}
      <p className="text-sm text-gray-700 line-clamp-2 h-10 leading-5">
        {product.name}
      </p>

      {/* Price row */}
      <div className="flex items-baseline gap-1 mt-2 flex-wrap">
        <span className="text-base font-semibold text-gray-900">
          ₹{product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-xs text-green-600 font-medium">
              {discount(product.price, product.originalPrice)}% off
            </span>
          </>
        )}
      </div>

      {/* Rating */}
      {product.rating && (
        <div className="flex items-center gap-1 mt-1">
          <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating} ★
          </span>
          <span className="text-xs text-gray-400">
            ({product.ratingCount?.toLocaleString()})
          </span>
        </div>
      )}

      {/* Stock */}
      {!product.inStock && (
        <p className="text-xs text-red-500 mt-1 font-medium">Out of stock</p>
      )}
    </Link>
  );
});
export default ProductCard;