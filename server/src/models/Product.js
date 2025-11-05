import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
    },
    images: [
      {
        url: String,
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ['split-keyboard', 'accessories', 'keycaps', 'switches'],
      default: 'split-keyboard',
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    variants: [
      {
        name: String, // e.g., "Color"
        options: [String], // e.g., ["Black", "White", "Gray"]
      },
    ],
    specifications: {
      layout: String,
      connectivity: [String], // ["Wireless", "USB-C"]
      switches: String,
      backlighting: String,
      dimensions: String,
      weight: String,
      batteryLife: String,
      compatibility: [String],
    },
    features: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

// Create slug from name before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
