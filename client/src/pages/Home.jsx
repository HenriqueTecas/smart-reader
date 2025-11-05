import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { productsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getAll({ featured: true, limit: 3 });
      setFeaturedProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      title: 'Reduce Wrist Strain',
      description: 'Ergonomic split design reduces wrist strain by up to 40%',
      icon: '💪',
    },
    {
      title: 'Increase Productivity',
      description: 'Type faster and more comfortably with optimized layout',
      icon: '⚡',
    },
    {
      title: 'Customizable',
      description: 'Hot-swappable switches and programmable keys',
      icon: '🎨',
    },
    {
      title: 'Premium Quality',
      description: 'Built with high-quality materials for durability',
      icon: '✨',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Developer',
      content:
        'This keyboard changed my life! No more wrist pain after long coding sessions.',
      rating: 5,
    },
    {
      name: 'Mike Johnson',
      role: 'Writer',
      content:
        'Best investment for my home office. The ergonomic design is fantastic.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Designer',
      content:
        'Love the customization options and the build quality is excellent!',
      rating: 5,
    },
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="bg-black py-24 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Type Smarter,
                <br />
                Not Harder
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Experience the future of typing with our premium ergonomic split
                keyboards. Designed for comfort, built for performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-primary inline-flex items-center justify-center">
                  Shop
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link to="/products/ergonomic-split-keyboard-pro" className="btn-secondary inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FiCheck className="text-white mr-2" />
                  Free Shipping
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-white mr-2" />
                  30-Day Returns
                </div>
                <div className="flex items-center">
                  <FiCheck className="text-white mr-2" />
                  1-Year Warranty
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800"
                alt="Ergonomic Split Keyboard"
                className="rounded-lg w-full"
              />
              <div className="absolute bottom-8 left-8 bg-white rounded-md p-6">
                <div className="text-4xl font-bold text-black">$69.99</div>
                <div className="text-sm text-gray-600 mt-1">Starting at</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-dark-secondary border-t border-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Why Choose Split Keyboards?
            </h2>
            <p className="text-xl text-gray-400">
              Discover the benefits of ergonomic typing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-black border-t border-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Featured Products
            </h2>
            <p className="text-xl text-gray-400">
              Our most popular ergonomic keyboards
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link to="/products" className="btn-primary inline-flex items-center">
              View All Products
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-dark-secondary border-t border-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Traditional vs. Split Keyboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6">
                Traditional Keyboard
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-400">Unnatural wrist position</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-400">Can cause RSI over time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-400">Fixed layout</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-400">Shoulder strain</span>
                </li>
              </ul>
            </div>

            <div className="card p-8 border-2 border-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-5 py-1.5 rounded-full text-sm font-semibold">
                Better Choice
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Split Keyboard
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Natural shoulder width</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Reduces wrist strain by 40%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Fully customizable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">Improved posture</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-black border-t border-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <div className="flex text-white mb-6 text-lg">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-secondary border-t border-gray-900">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Transform Your Typing?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers. 30-day money-back guarantee.
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center text-lg px-10 py-4">
            Shop Now
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
