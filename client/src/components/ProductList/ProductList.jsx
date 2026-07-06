import { useCallback, useState } from 'react';
import useProducts from './useProducts';
import ProductCard from './ProductCard';

const categories = [
  { label: 'Electronics', emoji: '📱' },
  { label: 'Clothing', emoji: '👗' },
  { label: 'Footwear', emoji: '👟' },
  { label: 'Home', emoji: '🏠' },
  { label: 'Books', emoji: '📚' },
  { label: 'Accessories', emoji: '👜' },
];

export default function ProductList() {
  const { products, loading, error, isPending } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(prev => prev === category ? null : category);
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-500 animate-pulse">Loading products...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-red-500">Error: {error}</div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">

      {isPending && (
        <div className="text-center text-sm text-gray-400 py-2 animate-pulse">
          Updating results...
        </div>
      )}

      {/* Category strip */}
      <div className="bg-white px-6 py-3 flex gap-8 overflow-x-auto shadow-sm">
        {categories.map(cat => (
          <div
            key={cat.label}
            onClick={() => handleCategoryClick(cat.label)}
            className={`flex flex-col items-center gap-1 cursor-pointer min-w-fit group
              ${selectedCategory === cat.label ? 'text-[#2874f0]' : ''}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl
              ${selectedCategory === cat.label ? 'bg-blue-100' : 'bg-blue-50 group-hover:bg-blue-100'}`}>
              {cat.emoji}
            </div>
            <span className="text-xs text-gray-700 group-hover:text-[#2874f0]">
              {cat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-lg p-6 flex justify-between items-center">
        <div>
          <h2 className="text-white text-xl font-semibold">Big Billion Days Sale</h2>
          <p className="text-gray-400 text-sm mt-1">Up to 80% off on top brands</p>
          <span className="inline-block mt-2 bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
            Limited time offer
          </span>
        </div>
        <div className="text-6xl">🛍️</div>
      </div>

      {/* Products */}
      <div className="mx-4 mt-4 bg-white rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {selectedCategory ? `${selectedCategory} Products` : 'Top deals for you'}
          </h2>
          {selectedCategory && (
            <span
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-[#2874f0] cursor-pointer font-medium"
            >
              Clear filter ✕
            </span>
          )}
        </div>

        {filteredProducts.length === 0 && !isPending ? (
          <div className="flex flex-col items-center h-64 justify-center gap-4">
            <div className="text-6xl">🔍</div>
            <h2 className="text-xl font-medium text-gray-700">No results found</h2>
            <p className="text-gray-400 text-sm">Try searching for something else</p>
          </div>
        ) : (
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-gray-100
            ${isPending ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}