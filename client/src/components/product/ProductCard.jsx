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
      className="card hover:shadow-xl transition-shadow duration-300 group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/400x300'}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discount}%
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating?.count > 0 && (
          <div className="flex items-center mb-3">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating.average)
                      ? 'fill-current'
                      : ''
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.rating.count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
