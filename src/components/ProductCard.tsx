import React, { useState } from "react";
import { Product } from "../types";
import { useStore } from "../store";
import { 
  Heart, 
  ShoppingCart, 
  ArrowLeftRight, 
  Star, 
  Zap,
  Eye,
  CheckCircle2
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onSelect, onQuickView }: ProductCardProps) {
  const { cart, wishlist, compareList, toggleWishlist, addToCart, addToCompare, removeFromCompare } = useStore();
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isInCompare = compareList.some((p) => p.id === product.id);
  
  // Calculate discount percentage
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 2000);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/60 rounded-3xl p-4 shadow-xs hover:shadow-xl transition-all duration-300 relative cursor-pointer group flex flex-col justify-between"
    >
      
      {/* Badges / Floating Actions */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
        <span className="bg-red-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
          -{discountPercent}%
        </span>
        {product.isTrending && (
          <span className="bg-amber-500 text-white font-semibold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
            <Zap className="w-2.5 h-2.5 fill-white" /> ტრენდული
          </span>
        )}
      </div>

      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1">
        
        {/* Wishlist button */}
        <button 
          id={`btn-wishlist-${product.id}`}
          onClick={handleToggleWishlist}
          className={`p-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xs rounded-full shadow-xs hover:scale-110 active:scale-95 transition ${
            isWishlisted ? "text-rose-500 saturate-150" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          }`}
          title="რჩეულებში დამატება"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
        </button>

        {/* Compare button */}
        <button 
          id={`btn-compare-${product.id}`}
          onClick={handleToggleCompare}
          className={`p-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xs rounded-full shadow-xs hover:scale-110 active:scale-95 transition ${
            isInCompare ? "text-amber-500" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          }`}
          title="შედარება"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

      </div>

      {/* Showcase Image Area */}
      <div className="w-full aspect-square rounded-2xl overflow-hidden relative mb-4">
        <div className={`w-full h-full bg-gradient-to-br ${product.image} flex items-center justify-center relative transition duration-500 group-hover:scale-103`}>
          <div className="absolute inset-0 bg-white/5 opacity-10"></div>
          
          {/* Abstract SVG Circles for visual premium design */}
          <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-16 h-16 border border-white/5 rounded-full"></div>
          </div>

          <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/40 backdrop-blur-xs text-[9px] text-zinc-100 rounded">
            უმაქნისობა: {product.uselessnessRating}/10
          </div>
          
          {/* Centered big custom Emoji representing product */}
          <div className="absolute text-5xl filter drop-shadow-md select-none transform group-hover:rotate-6 transition duration-300">
            {product.id === "smart-rock-tracker" && "🪨"}
            {product.id === "transparent-toaster" && "🍞"}
            {product.id === "bluetooth-banana-holder" && "🍌"}
            {product.id === "solar-flashlight" && "🔦"}
            {product.id === "anti-procrastination-hammer" && "🔨"}
            {product.id === "keyboard-for-cats" && "🐈"}
            {product.id === "usb-spoon-warmer" && "🥄"}
            {product.id === "wifi-umbrella" && "☔"}
          </div>
        </div>

        {/* Quick View Tray Hover */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="px-3.5 py-1.5 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            <Eye className="w-3.5 h-3.5" /> სწრაფი ნახვა
          </button>
        </div>
      </div>

      {/* Information text */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          
          {/* Category */}
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition mt-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <span id={`tagline-${product.id}`} className="text-[11px] text-zinc-400 italic block mt-0.5 leading-snug line-clamp-1">
            „{product.marketingTagline}“
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1 my-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) 
                      ? "text-amber-400 fill-amber-400" 
                      : "text-zinc-200 dark:text-zinc-700"
                  }`} 
                />
              ))}
            </div>
            <span className="text-[10px] text-zinc-400 font-medium font-sans">
              ({product.rating})
            </span>
          </div>

        </div>

        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 mt-2">
          
          {/* Stock state */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-zinc-400 capitalize">მარაგი:</span>
            {product.stock > 0 ? (
              <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">
                {product.stock} ერთეული
              </span>
            ) : (
              <span className="text-[10px] font-bold text-red-500">გაყიდულია</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 line-through block leading-none select-none">
                ₾{product.originalPrice}
              </span>
              <span className="text-base font-bold font-sans text-zinc-900 dark:text-white block mt-0.5">
                ₾{product.price}
              </span>
            </div>

            {/* Cartwright Add Action */}
            {product.stock > 0 ? (
              <button 
                id={`btn-add-cart-${product.id}`}
                onClick={handleAddToCart}
                disabled={isAddedAnimation}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer ${
                  isAddedAnimation 
                    ? "bg-green-500 text-white" 
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-950 dark:text-zinc-100"
                }`}
              >
                {isAddedAnimation ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-scale-up" />
                    <span className="text-xs font-bold font-sans">არჩეულია!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 transition-transform group-hover:rotate-12" />
                    <span className="text-xs font-bold font-sans">ყიდვა</span>
                  </>
                )}
              </button>
            ) : (
              <button 
                disabled 
                className="py-2 px-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-xl text-xs font-bold cursor-not-allowed"
              >
                ამოიწურა
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
