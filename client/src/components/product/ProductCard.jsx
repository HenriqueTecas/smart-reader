import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="card group"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-black">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/400x300'}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-80 object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-md text-xs font-semibold">
            -{discount}%
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <span className="text-white text-lg font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-white mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating?.count > 0 && (
          <div className="flex items-center mb-4">
            <div className="flex items-center text-white">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(product.rating.average)
                      ? 'fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500">
              ({product.rating.count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline space-x-2 mb-5">
          <span className="text-2xl font-semibold text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="w-full btn-secondary flex items-center justify-center space-x-2 text-sm"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span>Shop</span>
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
