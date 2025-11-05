import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1, selectedVariant = {}) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.product._id === product._id
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({
            items: [...items, { product, quantity, selectedVariant }],
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items;
        const updatedItems = items.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      removeFromCart: (productId) => {
        const items = get().items;
        const updatedItems = items.filter(
          (item) => item.product._id !== productId
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
