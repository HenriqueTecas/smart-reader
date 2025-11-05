import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Review from '../models/Review.js';

dotenv.config();

// Sample data
const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@splitkeyboard.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'customer',
  },
];

const products = [
  {
    name: 'Ergonomic Split Keyboard Pro',
    slug: 'ergonomic-split-keyboard-pro',
    description:
      'Premium split keyboard designed for maximum comfort and productivity. Features hot-swappable switches, wireless connectivity, and customizable RGB backlighting. Perfect for developers, writers, and anyone who spends long hours typing.',
    price: 69.99,
    compareAtPrice: 99.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
        alt: 'Ergonomic Split Keyboard Pro - Front View',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
        alt: 'Ergonomic Split Keyboard Pro - Side View',
        isPrimary: false,
      },
    ],
    category: 'split-keyboard',
    stock: 50,
    variants: [
      {
        name: 'Color',
        options: ['Black', 'White', 'Gray'],
      },
    ],
    specifications: {
      layout: '60% Split',
      connectivity: ['Wireless Bluetooth 5.0', 'USB-C'],
      switches: 'Hot-swappable (Compatible with Cherry MX)',
      backlighting: 'RGB Per-key',
      dimensions: '12.5" x 6" x 1.2"',
      weight: '1.8 lbs',
      batteryLife: 'Up to 40 hours',
      compatibility: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
    },
    features: [
      'Reduces wrist strain by 40%',
      'Hot-swappable mechanical switches',
      'Wireless & USB-C connectivity',
      'Customizable RGB backlighting',
      'Programmable keys with QMK/VIA support',
      'Premium PBT keycaps',
      'Adjustable tenting kit included',
      'Anti-ghosting and N-key rollover',
    ],
    featured: true,
  },
  {
    name: 'Compact Split Keyboard',
    slug: 'compact-split-keyboard',
    description:
      'A compact and portable split keyboard perfect for on-the-go productivity. Features a minimalist design without compromising on ergonomics.',
    price: 54.99,
    compareAtPrice: 74.99,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
        alt: 'Compact Split Keyboard',
        isPrimary: true,
      },
    ],
    category: 'split-keyboard',
    stock: 30,
    specifications: {
      layout: '40% Split',
      connectivity: ['USB-C'],
      switches: 'Gateron Brown',
      backlighting: 'White LED',
      dimensions: '10" x 5" x 1"',
      weight: '1.2 lbs',
      compatibility: ['Windows', 'macOS', 'Linux'],
    },
    features: [
      'Ultra-portable design',
      'Wired USB-C connection',
      'Tactile Gateron Brown switches',
      'Plug-and-play setup',
      'Durable aluminum frame',
    ],
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();
    await Review.deleteMany();

    console.log('Data cleared!');

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded!');

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log('Products seeded!');

    // Create sample review
    await Review.create({
      product: createdProducts[0]._id,
      user: createdUsers[1]._id,
      rating: 5,
      title: 'Amazing keyboard!',
      comment:
        'This split keyboard has completely transformed my typing experience. My wrists no longer hurt after long coding sessions. Highly recommend!',
      verified: true,
    });

    console.log('Reviews seeded!');
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
