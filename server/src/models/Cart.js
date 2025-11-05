import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sessionId: {
      type: String,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        selectedVariant: {
          type: Map,
          of: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure either user or sessionId is present
cartSchema.pre('save', function (next) {
  if (!this.user && !this.sessionId) {
    next(new Error('Cart must have either a user or sessionId'));
  }
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
