import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem, Order, User, Review, Coupon } from "./types";
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_COUPONS } from "./data";

interface StoreState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  reviews: Review[];
  compareList: Product[];
  recentlyViewed: string[]; // Product IDs
  user: User | null;
  activeCoupon: Coupon | null;
  darkMode: boolean;

  // Actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  addReview: (review: Review) => void;
  deleteReview: (reviewId: string) => void;
  approveReview: (reviewId: string) => void;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  addRecentlyViewed: (productId: string) => void;
  loginUser: (fullName: string, email: string) => void;
  logoutUser: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  createOrder: (shippingAddress: { fullName: string; city: string; address: string; phone: string }) => Order | null;
  toggleDarkMode: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      cart: [],
      wishlist: [],
      reviews: INITIAL_REVIEWS,
      compareList: [],
      recentlyViewed: [],
      user: null,
      activeCoupon: null,
      darkMode: false,

      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),

      updateProduct: (updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          cart: state.cart.filter((item) => item.product.id !== id),
          compareList: state.compareList.filter((p) => p.id !== id),
        })),

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );
          if (existingIndex > -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingIndex].quantity += quantity;
            return { cart: updatedCart };
          }
          return { cart: [...state.cart, { product, quantity }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      clearCart: () => set({ cart: [], activeCoupon: null }),

      toggleWishlist: (product) =>
        set((state) => {
          const isWishlisted = state.wishlist.includes(product.id);
          const updatedWishlist = isWishlisted
            ? state.wishlist.filter((id) => id !== product.id)
            : [...state.wishlist, product.id];
          return { wishlist: updatedWishlist };
        }),

      addReview: (review) =>
        set((state) => ({ reviews: [review, ...state.reviews] })),

      deleteReview: (reviewId) =>
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== reviewId),
        })),

      approveReview: (reviewId) =>
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId ? { ...r, isApproved: true } : r
          ),
        })),

      addToCompare: (product) =>
        set((state) => {
          if (state.compareList.some((p) => p.id === product.id)) return {};
          if (state.compareList.length >= 3) {
            // Remove first, add new
            return { compareList: [...state.compareList.slice(1), product] };
          }
          return { compareList: [...state.compareList, product] };
        }),

      removeFromCompare: (productId) =>
        set((state) => ({
          compareList: state.compareList.filter((p) => p.id !== productId),
        })),

      clearCompare: () => set({ compareList: [] }),

      addRecentlyViewed: (productId) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((id) => id !== productId);
          return { recentlyViewed: [productId, ...filtered].slice(0, 5) };
        }),

      loginUser: (fullName, email) =>
        set({
          user: {
            fullName,
            email,
            orders: [],
            isAuthenticated: true,
          },
        }),

      logoutUser: () => set({ user: null }),

      applyCoupon: (code) => {
        const coupon = INITIAL_COUPONS.find(
          (c) => c.code.toUpperCase() === code.toUpperCase()
        );
        if (coupon) {
          set({ activeCoupon: coupon });
          return { success: true, message: `კუპონი წარმატებით გააქტიურდა: -${coupon.discountPercentage}%` };
        }
        return { success: false, message: "არასწორი კუპონის კოდი!" };
      },

      removeCoupon: () => set({ activeCoupon: null }),

      createOrder: (shippingAddress) => {
        const { cart, activeCoupon, user } = get();
        if (cart.length === 0) return null;

        const subtotal = cart.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        const discount = activeCoupon
          ? (subtotal * activeCoupon.discountPercentage) / 100
          : 0;
        const totalPrice = Math.max(0, subtotal - discount);

        const newOrder: Order = {
          id: "ORD-" + Math.floor(Math.random() * 900000 + 100000),
          date: new Date().toISOString().split("T")[0],
          items: cart.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
          totalPrice,
          couponCode: activeCoupon?.code,
          shippingAddress,
          status: "shipping",
          trackingNumber: "TRK-" + Math.floor(Math.random() * 90000000 + 10000000),
        };

        // If user is authenticated, append the order to user order history
        if (user) {
          const updatedUser = {
            ...user,
            orders: [newOrder, ...user.orders],
          };
          set({ user: updatedUser, cart: [], activeCoupon: null });
        } else {
          // If guest, we still clear cart and return the order
          set({ cart: [], activeCoupon: null });
        }

        // Reduce stock in state
        set((state) => ({
          products: state.products.map((p) => {
            const cartItem = cart.find((item) => item.product.id === p.id);
            if (cartItem) {
              return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
            }
            return p;
          }),
        }));

        return newOrder;
      },

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "useless-store-storage",
    }
  )
);
