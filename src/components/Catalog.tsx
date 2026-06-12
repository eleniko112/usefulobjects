import { useState } from "react";
import { useStore } from "../store";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, ArrowLeftRight, Trash2, ArrowRight } from "lucide-react";

interface CatalogProps {
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string) => void;
  searchQuery: string;
}

export default function Catalog({ onSelectProduct, onQuickView, onNavigate, searchQuery }: CatalogProps) {
  const { products, compareList, clearCompare } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("ყველა");
  const [sortBy, setSortBy] = useState<string>("default");

  // Step 1: Filter by category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "ყველა" || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.marketingTagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Step 2: Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "uselessness") return b.uselessnessRating - a.uselessnessRating;
    return 0; // Default popularity / featured
  });

  const categories = ["ყველა", "სმარტ-ტექნოლოგიები", "საოჯახო ტექნიკა", "ექსტრემალური / გარე"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-sans font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
          ინოვაციური მოწყობილობების კატალოგი
        </h1>
        <p className="text-xs text-zinc-400">
          ყოველი ნივთი დამზადებულია პრემიუმ ესთეტიკითა და დამზადებულია სრული უსარგებლობის კოდექსით.
        </p>
      </div>

      {/* Filter and sort row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-zinc-200/60 dark:border-zinc-800/60 mb-8">
        
        {/* Categories togglers */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat 
                  ? "bg-black dark:bg-white text-white dark:text-zinc-950" 
                  : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting selection selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
          <span className="text-xs text-zinc-400 capitalize hidden sm:inline">ფილტრი:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 border-none text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
          >
            <option value="default">პოპულარობა (Featured)</option>
            <option value="price_asc">ფასი: ზრდადი</option>
            <option value="price_desc">ფასი: კლებადი</option>
            <option value="rating">რეიტინგი: მაღალი</option>
            <option value="uselessness">უმაქნისობა: 10-დან 1-მდე</option>
          </select>
        </div>

      </div>

      {/* Product list grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-950/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
          <p className="text-sm text-zinc-400">პროდუქტები მითითებული კრიტერიუმით ვერ მოიძებნა.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((prod) => (
            <div key={prod.id}>
              <ProductCard 
                product={prod}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      )}

      {/* Floating compare indicators tray if compareList contains items */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-md w-full bg-zinc-950 text-white rounded-2xl p-3 shadow-2xl flex items-center justify-between border border-zinc-800">
          <div className="flex items-center gap-2.5">
            <ArrowLeftRight className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-bold font-sans">
              შესადარებლად არჩეულია {compareList.length} ნივთი
            </span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={clearCompare}
              className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition"
              title="გასუფთავება"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate("compare")}
              className="px-3 py-1 bg-white text-zinc-950 text-xs font-bold rounded-lg hover:opacity-90 transition flex items-center gap-1"
            >
              შედარება <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
