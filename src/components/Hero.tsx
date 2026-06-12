import { useState, useEffect } from "react";
import { Product } from "../types";
import { useStore } from "../store";
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  HelpCircle, 
  Award, 
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";

interface HeroProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function Hero({ onNavigate, onSelectProduct }: HeroProps) {
  const { products, toggleWishlist, wishlist } = useStore();
  const featuredInventions = products.filter((p) => p.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomInvention, setRandomInvention] = useState<Product | null>(null);
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [stats, setStats] = useState({
    soldCount: 14240,
    uselessnessIndex: 9.8,
    awardsEarned: 24,
  });

  // Rotate hero slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredInventions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredInventions.length]);

  // Simulate active stats updating
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        soldCount: prev.soldCount + Math.floor(Math.random() * 2) + 1,
      }));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = featuredInventions[currentIndex] || products[0];

  const handleGenerateRandom = () => {
    const randomIndex = Math.floor(Math.random() * products.length);
    setRandomInvention(products[randomIndex]);
    setShowRandomModal(true);
  };

  return (
    <div id="hero-section-container" className="relative pt-24 pb-12 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-350">
      
      {/* Dynamic Background Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/40 dark:bg-amber-500/10 rounded-full blur-3xl -z-10 transition-all duration-1000 animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 animate-ping" style={{ animationDuration: '10s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Elite Sub-Header Pill */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-zinc-900 shadow-xs border border-zinc-200/50 dark:border-zinc-800 rounded-full text-xs text-zinc-800 dark:text-zinc-200 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span>დღის რევოლუციური უმაქნისობა</span>
          </div>
        </div>

        {/* Hero Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogans and Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-zinc-900 dark:text-white">
              ტექნოლოგიები, <br />
              რომლებიც <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">არავის სჭირდება</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0">
              Useless Inventions Store ყიდის მსოფლიოში ყველაზე აბსურდულ ჭკვიან მოწყობილობებს, დახვეწილ საოჯახო ტექნიკასა და ციფრულ აქსესუარებს. ჩვენი სლოგანია: <b>აბსურდული დანიშნულება, უმაღლესი ხარისხის შესრულება.</b>
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button 
                id="btn-hero-catalog"
                onClick={() => onNavigate("catalog")}
                className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-xl font-medium flex items-center justify-center gap-2 transition-transform hover:scale-103 cursor-pointer shadow-md"
              >
                შედი კატალოგში
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                id="btn-random-invention-generator"
                onClick={handleGenerateRandom}
                className="px-6 py-3 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl font-medium flex items-center justify-center gap-2 transition-transform hover:scale-103 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                რანდომატორი
              </button>
            </div>

            {/* Premium Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-bold font-sans text-zinc-900 dark:text-white leading-none">
                  {stats.soldCount.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-400 capitalize">გაყიდული უაზრობა</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-sans text-zinc-900 dark:text-white leading-none">
                  {stats.uselessnessIndex} / 10
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-400 capitalize">უმაქნისობის ინდექსი</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-sans text-zinc-900 dark:text-white leading-none">
                  {stats.awardsEarned}+
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-400 capitalize">ოქროს სერტიფიკატი</span>
              </div>
            </div>

          </div>

          {/* Majestic Hero Interactive Product Frame */}
          {activeSlide && (
            <div className="lg:col-span-5 relative">
              <div 
                id="hero-featured-slide"
                onClick={() => onSelectProduct(activeSlide)}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/55 rounded-3xl p-6 shadow-xl relative cursor-pointer group transition-all duration-500 hover:shadow-2xl hover:border-amber-400/30"
              >
                {/* Sale Badge */}
                <span className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  დღის რჩეული
                </span>

                {/* Absurd Stock Live */}
                <span className="absolute top-4 right-4 z-10 bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 text-[10px] font-semibold px-2 py-0.5 rounded-full animate-pulse">
                  მარაგშია მხოლოდ {activeSlide.stock} ნივთი
                </span>

                {/* Showcase Image with Gradient */}
                <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${activeSlide.image} flex items-center justify-center relative overflow-hidden group-hover:scale-101 transition duration-500`}>
                  <div className="absolute inset-0 bg-white/5 opacity-10 blur-xl"></div>
                  
                  {/* Floating Mockup Lines */}
                  <div className="w-40 h-40 border-2 border-white/20 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '30s' }}>
                    <div className="w-28 h-28 border border-white/10 rounded-full"></div>
                  </div>

                  {/* Dynamic Abstract Colored Bubble on product frame */}
                  <div className="w-16 h-16 bg-white/25 dark:bg-black/25 backdrop-blur-md rounded-2xl absolute flex items-center justify-center shadow-lg transform group-hover:scale-110 transition duration-500">
                    <span className="text-4xl text-white dark:text-amber-300">💡</span>
                  </div>
                </div>

                {/* Technical Product Metadata */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white group-hover:text-amber-500 transition">
                      {activeSlide.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-mono">
                        U-Rating: {activeSlide.uselessnessRating}/10
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 italic">
                    „{activeSlide.marketingTagline}“
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 font-desc">
                    {activeSlide.description}
                  </p>
                  
                  <div className="flex items-end justify-between pt-2">
                    <div>
                      <span className="text-xs text-zinc-400 line-through block">
                        ₾{activeSlide.originalPrice}
                      </span>
                      <span className="text-xl font-bold font-sans text-zinc-900 dark:text-white">
                        ₾{activeSlide.price}
                      </span>
                    </div>
                    
                    <span className="text-xs text-zinc-800 dark:text-zinc-200 group-hover:translate-x-1.5 transition flex items-center gap-1 font-medium">
                      დესკტოპ ხედი <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Random Invention Generator Modal */}
      {showRandomModal && randomInvention && (
        <div id="random-generator-modal" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-250">
            
            <button 
              id="btn-close-random-modal"
              onClick={() => setShowRandomModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full"
            >
              ✕
            </button>

            <div className="text-center space-y-4">
              <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-950/30 text-amber-500 rounded-full animate-bounce">
                <Sparkles className="w-6 h-6" />
              </div>
              
              <span className="block text-xs font-semibold text-amber-500 uppercase tracking-widest leading-none">
                გენერატორმა შეარჩია თქვენთვის:
              </span>

              <h3 className="font-sans font-bold text-2xl text-zinc-900 dark:text-white">
                {randomInvention.name}
              </h3>

              {/* Graphical Visual Wrapper */}
              <div className={`w-full h-40 rounded-2xl bg-gradient-to-tr ${randomInvention.image} flex items-center justify-center text-white text-5xl relative overflow-hidden`}>
                <span className="relative z-10 animate-pulse">⚙️</span>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              <p className="text-xs text-zinc-400 italic">
                „{randomInvention.marketingTagline}“
              </p>

              <p className="text-sm text-zinc-500 dark:text-zinc-300 leading-relaxed text-left max-h-24 overflow-y-auto pr-1 font-desc">
                {randomInvention.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-left border-y border-zinc-100 dark:border-zinc-800 py-3 my-2 text-xs">
                <div>
                  <span className="text-zinc-400 block">უმაქნისობის ინდექსი</span>
                  <span className="font-bold text-amber-500 block text-sm">
                    {randomInvention.uselessnessRating} / 10
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block">სერტიფიკაცია</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 block text-sm truncate">
                    {randomInvention.certifications[0]}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-zinc-400 line-through block">₾{randomInvention.originalPrice}</span>
                  <span className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">₾{randomInvention.price}</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={handleGenerateRandom}
                    className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 rounded-xl text-xs font-semibold transition"
                  >
                    სხვა ნივთი
                  </button>
                  <button 
                    onClick={() => {
                      onSelectProduct(randomInvention);
                      setShowRandomModal(false);
                    }}
                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:opacity-90 transition"
                  >
                    დეტალურად
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
