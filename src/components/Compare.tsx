import { useStore } from "../store";
import { ArrowLeftRight, Trash2, ShoppingCart, Star } from "lucide-react";
import { Product } from "../types";

interface CompareProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export default function Compare({ onSelectProduct, onNavigate }: CompareProps) {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center space-y-4">
        <div className="inline-flex p-6 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-full">
          <ArrowLeftRight className="w-12 h-12" />
        </div>
        <h2 className="font-sans font-bold text-2xl text-zinc-900 dark:text-white">შედარების სია ცარიელია</h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-sm">
          აირჩიეთ სასურველი აბსურდული ნივთები კატალოგიდან (მაქსიმუმ 3 ერთდროულად) და შეადარეთ მათი უსარგებლო სპეციფიკაციები.
        </p>
        <button 
          onClick={() => onNavigate("catalog")}
          className="mt-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 rounded-xl font-bold text-sm transition"
        >
          კატალოგი
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
            გამოგონებების შედარება
          </h1>
          <p className="text-xs text-zinc-400">
            ინოვაციური მოწყობილობების აბსურდულობის დეტალური ანალიზი.
          </p>
        </div>
        <button 
          onClick={clearCompare}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-950/20 text-red-700 dark:text-red-400 font-bold rounded-xl text-xs transition"
        >
          ყველას წაშლა
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-sm">
        
        {/* Render comparison headers & columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-100 dark:divide-zinc-800 text-xs">
          
          {/* First column: Headers titles */}
          <div className="hidden md:flex flex-col bg-zinc-50 dark:bg-zinc-950/40 font-bold text-zinc-400 select-none">
            <div className="h-44 p-4 flex items-end">ნახაზი / სახელი</div>
            <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800">კატეგორია</div>
            <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800">ფასი</div>
            <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800">უმაქნისობა</div>
            <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800">ლაბორატორია</div>
            <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800">მთავარი დეტალი</div>
            <div className="p-4 py-4.5 border-t border-zinc-100 dark:border-zinc-800 flex-1">მოქმედება</div>
          </div>

          {/* Active compared columns */}
          {compareList.map((p) => (
            <div key={p.id} className="flex flex-col justify-between">
              
              {/* Product header info */}
              <div className="p-4 h-44 flex flex-col justify-between relative group">
                <button 
                  onClick={() => removeFromCompare(p.id)}
                  className="absolute top-2 right-2 p-1 bg-zinc-100 hover:bg-red-50 hover:text-red-500 rounded-full text-zinc-400 dark:bg-zinc-800"
                  title="შედარებიდან წაშლა"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div 
                  onClick={() => onSelectProduct(p)}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-tr ${p.image} flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition`}
                >
                  💡
                </div>

                <div className="mt-3">
                  <h3 
                    onClick={() => onSelectProduct(p)}
                    className="font-sans font-bold text-zinc-950 dark:text-white hover:text-amber-500 transition line-clamp-1 cursor-pointer leading-tight"
                  >
                    {p.name}
                  </h3>
                  <span className="text-[10px] text-zinc-400 italic font-mono mt-0.5 line-clamp-1 block">
                    „{p.marketingTagline}“
                  </span>
                </div>
              </div>

              {/* Attributes rows */}
              <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center md:block">
                <span className="font-bold text-zinc-400 md:hidden uppercase text-[9px]">კატეგორია:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{p.category}</span>
              </div>

              <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center md:block">
                <span className="font-bold text-zinc-400 md:hidden uppercase text-[9px]">ფასი:</span>
                <span className="font-mono font-bold text-zinc-950 dark:text-white">₾{p.price}</span>
              </div>

              <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center md:block">
                <span className="font-bold text-zinc-400 md:hidden uppercase text-[9px]">უმაქნისობა:</span>
                <span className="font-extrabold text-amber-500 font-mono text-sm">{p.uselessnessRating} / 10</span>
              </div>

              <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center md:block">
                <span className="font-bold text-zinc-400 md:hidden uppercase text-[9px]">ლაბორატორია:</span>
                <span className="font-semibold text-zinc-600 dark:text-zinc-300 truncate block max-w-[150px]">{p.scientificProof.laboratory}</span>
              </div>

              <div className="p-4 py-3.5 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center md:block">
                <span className="font-bold text-zinc-400 md:hidden uppercase text-[9px]">მთავარი დეტალი:</span>
                <span className="font-semibold text-zinc-600 dark:text-zinc-300 font-mono">{p.specs[0]?.value || "Quantum Gauge"}</span>
              </div>

              {/* Buy actions */}
              <div className="p-4 py-4.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20">
                <button 
                  onClick={() => addToCart(p, 1)}
                  className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 rounded-xl font-bold flex items-center justify-center gap-1.5 transition text-xs cursor-pointer shadow-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> კალათაში დამატება
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
