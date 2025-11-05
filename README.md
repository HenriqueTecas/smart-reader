# Split Keyboard Shop - Full-Stack E-Commerce Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, full-stack e-commerce platform for selling premium ergonomic split keyboards. Built with React, Express.js, MongoDB, and Stripe integration.

![Split Keyboard Shop](https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800)

## 🎯 Project Overview

This is a production-ready e-commerce platform designed specifically for selling ergonomic split keyboards. The platform emphasizes user experience, modern design, and comprehensive functionality for both customers and administrators.

### Key Features

- 🛍️ **Full E-Commerce Functionality**: Browse products, add to cart, and complete purchases
- 🔐 **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- 💳 **Payment Integration**: Ready for Stripe payment processing
- 📦 **Order Management**: Complete order tracking from placement to delivery
- ⭐ **Product Reviews**: Customer review system with verified purchases
- 👤 **User Profiles**: Manage personal information and view order history
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS and Framer Motion
- 📱 **Mobile-First**: Fully responsive across all devices
- 🔧 **Admin Dashboard**: Comprehensive tools for managing products and orders

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Hook Form** - Form validation
- **Zod** - Schema validation
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting
- **Morgan** - HTTP request logger
- **Cors** - Cross-origin resource sharing

## 📁 Project Structure

```
smart-reader/
├── client/                     # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Header, Footer
│   │   │   ├── product/       # ProductCard
│   │   │   ├── cart/          # Cart components
│   │   │   └── common/        # Reusable components
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   └── admin/         # Admin pages
│   │   ├── store/             # Zustand state management
│   │   ├── services/          # API service layer
│   │   ├── utils/             # Utility functions
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                     # Backend Express application
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   ├── config/            # Configuration files
│   │   ├── utils/             # Utility functions
│   │   └── server.js          # Server entry point
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-reader
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/split-keyboard-shop
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=30d
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   CLIENT_URL=http://localhost:5173
   ```

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
   ```

5. **Seed the database** (optional)
   ```bash
   cd server
   npm run seed
   ```

6. **Start the development servers**

   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 👥 Demo Accounts

After seeding the database, you can use these demo accounts:

**Customer Account:**
- Email: john@example.com
- Password: password123

**Admin Account:**
- Email: admin@splitkeyboard.com
- Password: admin123

## 📋 Features Breakdown

### Customer Features
- ✅ Browse products with filtering and sorting
- ✅ View detailed product information with images and specifications
- ✅ Add products to cart with quantity selection
- ✅ Complete checkout with shipping information
- ✅ User registration and authentication
- ✅ Profile management
- ✅ Order history and tracking
- ✅ Product reviews and ratings

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Product management (CRUD operations)
- ✅ Order management and status updates
- ✅ View customer information
- ✅ Sales analytics (basic)

### Technical Features
- ✅ JWT-based authentication
- ✅ Protected routes (client and server)
- ✅ Password hashing with bcrypt
- ✅ Input validation (client and server)
- ✅ Error handling and user feedback
- ✅ Responsive design for all screen sizes
- ✅ Loading states and spinners
- ✅ Toast notifications
- ✅ Cart persistence in local storage
- ✅ Rate limiting on API endpoints
- ✅ Security headers with Helmet
- ✅ CORS configuration

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt (10 rounds)
- Protected API routes
- Input validation on both client and server
- Rate limiting to prevent abuse
- Security headers with Helmet
- CORS configuration
- Environment variable protection

## 📊 Database Schema

### User
- firstName, lastName, email, password (hashed)
- role (customer/admin)
- addresses array
- timestamps

### Product
- name, slug, description, price, compareAtPrice
- images array
- category, stock, variants
- specifications (object)
- features array
- rating (average, count)
- timestamps

### Order
- orderNumber (auto-generated)
- user reference
- items array with product details
- shippingAddress (object)
- paymentMethod, paymentResult
- subtotal, shippingCost, tax, total
- status (pending, processing, shipped, delivered, cancelled)
- timestamps

### Cart
- user reference (optional)
- sessionId (for guest users)
- items array
- timestamps

### Review
- product and user references
- rating (1-5), title, comment
- verified (boolean)
- timestamps

## 🎨 Design Philosophy

1. **Clean & Modern**: Minimalist design with clear visual hierarchy
2. **Product-First**: Large, high-quality images and detailed information
3. **Trust Signals**: Reviews, ratings, and security badges
4. **Mobile-First**: Responsive design optimized for all devices
5. **Performance**: Optimized images, code splitting, and fast loading

## 🚢 Deployment

### Backend Deployment (Railway/Render)

1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to client directory: `cd client`
3. Run: `vercel`
4. Follow the prompts

### Database (MongoDB Atlas)

1. Create a free cluster on MongoDB Atlas
2. Update `MONGODB_URI` in your environment variables
3. Whitelist your deployment IP addresses

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint
```

## 📈 Future Enhancements

- [ ] Stripe payment integration (currently demo mode)
- [ ] Email notifications for orders
- [ ] Advanced search with filters
- [ ] Wishlist functionality
- [ ] Product comparison tool
- [ ] Blog/Resources section
- [ ] Newsletter subscription
- [ ] Inventory management improvements
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Product recommendations
- [ ] Social media integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

Built with ❤️ for ergonomic typing enthusiasts

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons from React Icons
- UI inspiration from Lofree and NuPhy
- Community feedback and support

## 📞 Support

For support, email support@splitkeyboard.com or open an issue in the GitHub repository.

---

**Happy Coding! 🚀⌨️**

Transform the typing experience, one split keyboard at a time.