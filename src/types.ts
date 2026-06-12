export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  isApproved: boolean; // For admin moderation
}

export interface Product {
  id: string;
  name: string;
  englishName: string;
  category: string;
  description: string;
  marketingTagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  uselessnessRating: number; // 1 to 10
  image: string; // Dynamic path or gradient pattern
  iconName: string; // Lucide icon lookup
  stock: number;
  isFeatured: boolean;
  isTrending: boolean;
  scientificProof: {
    researchStudy: string;
    laboratory: string;
    absurdStats: { label: string; value: string }[];
  };
  whyYouNeedThis: string[];
  expertEndorsement: {
    expertName: string;
    expertTitle: string;
    quote: string;
  };
  certifications: string[];
  faq: { q: string; a: string }[];
  specs: { label: string; value: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  totalPrice: number;
  couponCode?: string;
  shippingAddress: {
    fullName: string;
    city: string;
    address: string;
    phone: string;
  };
  status: "shipping" | "in_transit" | "delivered" | "lost_in_space"; // Fun statuses
  trackingNumber: string;
}

export interface User {
  email: string;
  fullName: string;
  orders: Order[];
  isAuthenticated: boolean;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
}

export interface ActivityNotification {
  id: string;
  city: string;
  productName: string;
  timeAgo: string;
}
