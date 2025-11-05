import { Link } from 'react-router-dom';
import { FiMail, FiTwitter, FiGithub, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900 text-gray-400">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-lg">SK</span>
              </div>
              <span className="text-lg font-medium text-white">
                Split Keyboard
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Type Smarter, Not Harder. Premium ergonomic split keyboards at
              affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm">Stay Updated</h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Subscribe to get special offers and news.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-dark-secondary border border-gray-800 rounded-l-md text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-black px-4 py-2 rounded-r-md hover:bg-gray-200 transition-colors">
                <FiMail />
              </button>
            </div>
            {/* Social Links */}
            <div className="flex space-x-5 mt-6">
              <a href="#" className="hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 mt-12 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Split Keyboard Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
