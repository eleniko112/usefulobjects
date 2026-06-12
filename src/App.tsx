import { useState, useEffect } from "react";
import { useStore } from "./store";
import { Product } from "./types";

// Import custom modular premium components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Compare from "./components/Compare";
import UserProfile from "./components/UserProfile";
import Dashboard from "./components/Dashboard";

// Gamified & AI modules
import SpinWheel from "./components/SpinWheel";
import ActivityFeed from "./components/ActivityFeed";
import Chatbot from "./components/Chatbot";

import { Eye, X, Star, ShoppingCart, Heart, ArrowLeftRight } from "lucide-react";

export default function App() {
  const { darkMode, toggleWishlist, addToCart, wishlist, cart } = useStore();
  const [currentPage, setCurrentPage] = useState<string>("home"); // "home", "catalog", "cart", "checkout", "compare", "profile", "dashboard", "product-detail"
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync dark class on document element so Tailwind darkMode classes trigger correctly
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && currentPage !== "catalog") {
      setCurrentPage("catalog");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-zinc-950 text-zinc-100 dark" : "bg-zinc-50 text-zinc-900"}`}>
      
      {/* Universal Sticky Glass Navbar */}
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        searchQuery={searchQuery}
        onSearch={handleSearchChange}
      />

      {/* Primary Page views */}
      <main className="pb-24">
        {currentPage === "home" && (
          <div className="space-y-12">
            <Hero 
              onNavigate={handleNavigate} 
              onSelectProduct={handleSelectProduct} 
            />
            
            {/* Daily featured marketing block */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="bg-gradient-to-r from-amber-500/10 via-red-500/5 to-zinc-900/10 dark:from-amber-500/10 dark:via-zinc-900/20 dark:to-zinc-950 border border-zinc-200/40 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl">
                  <span className="bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Featured</span>
                  <h2 className="font-sans font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white tracking-tight leading-none">
                    რელიგიური Wi-Fi ქოლგა Pro
                  </h2>
                  <p className="text-xs text-zinc-400 italic font-mono">„დაკავშირებულობა უამინდობის მიუხედავად“</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    ეს არ არის უბრალო ქოლგა. Pro მოდელი აღჭურვილია მიმღები ანტენებით, რომლებიც გთავაზობენ 5G სიგნალს უშუალოდ წვიმის წვეთებიდან კაპილარული რეზონანსის ხარჯზე.
                  </p>
                </div>
                
                <button 
                  onClick={() => handleNavigate("catalog")}
                  className="px-6 py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold rounded-xl shadow-lg transition-transform hover:scale-103 cursor-pointer shrink-0"
                >
                  შეიძინე ეხლავე
                </button>
              </div>
            </div>

          </div>
        )}

        {currentPage === "catalog" && (
          <Catalog 
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
          />
        )}

        {currentPage === "product-detail" && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => handleNavigate("catalog")}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === "cart" && (
          <Cart 
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === "checkout" && (
          <Checkout onNavigate={handleNavigate} />
        )}

        {currentPage === "compare" && (
          <Compare 
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "profile" && (
          <UserProfile />
        )}

        {currentPage === "dashboard" && (
          <Dashboard />
        )}
      </main>

      {/* Real-time interactive components */}
      <SpinWheel />
      <ActivityFeed />
      <Chatbot />

      {/* QUICK VIEW COMPANION MODAL SYSTEM */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl">
            
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 ">
              
              <div className={`w-32 h-32 rounded-2xl bg-gradient-to-tr ${quickViewProduct.image} flex items-center justify-center shrink-0 text-6xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/5"></div>
                {quickViewProduct.id === "smart-rock-tracker" && "🪨"}
                {quickViewProduct.id === "transparent-toaster" && "🍞"}
                {quickViewProduct.id === "bluetooth-banana-holder" && "🍌"}
                {quickViewProduct.id === "solar-flashlight" && "🔦"}
                {quickViewProduct.id === "anti-procrastination-hammer" && "🔨"}
                {quickViewProduct.id === "keyboard-for-cats" && "🐈"}
                {quickViewProduct.id === "usb-spoon-warmer" && "🥄"}
                {quickViewProduct.id === "wifi-umbrella" && "☔"}
              </div>

              <div className="space-y-3 min-w-0 flex-1">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{quickViewProduct.category}</span>
                <h3 className="font-sans font-bold text-lg text-zinc-955 dark:text-white truncate">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-zinc-400 italic mt-0.5">„{quickViewProduct.marketingTagline}“</p>
                <p className="text-xs text-zinc-550 dark:text-zinc-350 leading-relaxed font-desc line-clamp-3">
                  {quickViewProduct.description}
                </p>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? "text-amber-400 fill-amber-400" : "text-zinc-200 dark:text-zinc-700"}`} />
                  ))}
                  <span className="text-[10px] text-zinc-400 font-sans ml-1">({quickViewProduct.rating})</span>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-zinc-400 line-through">₾{quickViewProduct.originalPrice}</span>
                    <span className="block font-bold text-base text-zinc-950 dark:text-white">₾{quickViewProduct.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleSelectProduct(quickViewProduct)}
                      className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                    >
                      დეტალები
                    </button>
                    <button 
                      onClick={() => {
                        addToCart(quickViewProduct, 1);
                        setQuickViewProduct(null);
                      }}
                      className="px-3.5 py-1.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold rounded-xl hover:opacity-90 transition shadow-md"
                    >
                      ყიდვა
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
