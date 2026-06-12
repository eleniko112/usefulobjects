import React, { useState } from "react";
import { Product, Review } from "../types";
import { useStore } from "../store";
import { 
  Star, 
  CheckCircle, 
  HelpCircle, 
  ShieldCheck, 
  Award, 
  Layers, 
  MessageSquare, 
  User, 
  X, 
  ChevronRight, 
  Trash2, 
  Edit3,
  RotateCw,
  Plus,
  Minus
} from "lucide-react";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetail({ product, onBack, onSelectProduct }: ProductDetailProps) {
  const { 
    reviews, 
    addReview, 
    deleteReview, 
    addToCart, 
    toggleWishlist, 
    wishlist, 
    products 
  } = useStore();

  const [activeTab, setActiveTab] = useState<"specs" | "science" | "faq">("specs");
  const [rotationAngle, setRotationAngle] = useState(0); // For 360° visual helper
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(wishlist.includes(product.id));

  // Reviews submission state
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // Filter reviews specifically for this product
  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleRotateVisual = () => {
    setRotationAngle((prev) => (prev + 45) % 360);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    if (editingReviewId) {
      // Treat edit by deleting old one first
      deleteReview(editingReviewId);
    }

    const newRev: Review = {
      id: "rev-" + Math.floor(Math.random() * 900000 + 100000),
      productId: product.id,
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split("T")[0],
      isApproved: true
    };

    addReview(newRev);
    setReviewAuthor("");
    setReviewRating(5);
    setReviewComment("");
    setEditingReviewId(null);
  };

  const handleEditReview = (rev: Review) => {
    setEditingReviewId(rev.id);
    setReviewAuthor(rev.author);
    setReviewRating(rev.rating);
    setReviewComment(rev.comment);
  };

  // Recommendations: Other products from category or just any other items
  const recommendations = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      
      {/* Back button */}
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white font-semibold uppercase tracking-wider transition"
      >
        ← კატალოგში დაბრუნება
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Gallery / 360 viewer Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl bg-zinc-50 dark:bg-zinc-950/25 p-6 shadow-xs flex flex-col items-center">
            
            {/* Visual Frame */}
            <div className={`w-full aspect-square rounded-2xl bg-gradient-to-br ${product.image} flex items-center justify-center relative overflow-hidden transition-all duration-500`}
                 style={{ transform: `rotate(${rotationAngle}deg)` }}>
              
              {/* Absurd 3D mockup design dots */}
              <div className="absolute inset-0 border border-white/5 opacity-20"></div>
              
              <div className="text-8xl select-none filter drop-shadow-xl">
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

            {/* 360° Rotate Button Control */}
            <div className="mt-4 flex items-center gap-2">
              <button 
                onClick={handleRotateVisual}
                className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg flex items-center gap-1.5 hover:opacity-90 transition shadow-md"
              >
                <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                მოატრიალე 360° ვექტორი
              </button>
              <span className="text-[10px] text-zinc-400">აქტიური კუთხე: {rotationAngle}°</span>
            </div>

            {/* Uselessness Meter */}
            <div className="w-full mt-6 bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/60">
              <div className="flex justify-between items-center text-xs font-extrabold text-zinc-800 dark:text-zinc-200 mb-2">
                <span>უმაქნისობის კოეფიციენტი:</span>
                <span className="text-amber-500 font-mono">{product.uselessnessRating} / 10</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500"
                  style={{ width: `${product.uselessnessRating * 10}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium italic mt-2.5">
                {product.uselessnessRating >= 9 
                  ? "კლასიფიცირებულია როგორც აბსოლუტური, სრული სულიერი უსარგებლო ხელოვნება." 
                  : "ფლობს მინერალურ-აგრესიულ თვისებებს, თუმცა უსარგებლოა ყოველდღიურ ყოფაში."
                }
              </p>
            </div>

          </div>

          {/* Expert Quote Card */}
          <div className="border border-zinc-200/50 dark:border-zinc-800/60 rounded-3xl p-5 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden">
            <span className="absolute -top-1 right-2 text-7xl text-zinc-100 dark:text-zinc-800 font-serif leading-none select-none">“</span>
            <div className="relative space-y-3">
              <span className="text-[9px] uppercase font-bold text-amber-500 tracking-widest block">ექსპერტის რეკომენდაცია</span>
              <p className="text-xs text-zinc-500 dark:text-zinc-300 italic leading-relaxed">
                „{product.expertEndorsement.quote}“
              </p>
              <div>
                <span className="block text-xs font-bold text-zinc-950 dark:text-white">{product.expertEndorsement.expertName}</span>
                <span className="block text-[10px] text-zinc-400">{product.expertEndorsement.expertTitle}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Product Details Columns */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Header marketing */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{product.category}</span>
            <h1 className="font-sans font-bold text-3xl sm:text-4xl text-zinc-950 dark:text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm font-semibold tracking-wide text-zinc-400 italic font-sans">
              „{product.marketingTagline}“
            </p>
          </div>

          {/* Price and Stock */}
          <div className="flex items-end justify-between p-4 bg-zinc-50 dark:bg-zinc-950/35 border border-zinc-200/50 dark:border-zinc-800/60 rounded-2xl">
            <div>
              <span className="text-xs text-zinc-400 line-through">₾{product.originalPrice}</span>
              <span className="block text-3xl font-extrabold text-zinc-950 dark:text-white">₾{product.price}</span>
            </div>
            <div className="text-right">
              <span className="block text-xs text-zinc-400">მარაგის სტატუსი:</span>
              <span className="text-sm font-bold text-green-600 dark:text-green-400 animate-pulse">
                აქტიურია {product.stock} ცალი
              </span>
            </div>
          </div>

          {/* General Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">პროდუქტის არსი</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-desc">
              {product.description}
            </p>
          </div>

          {/* Absurd why you need this */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">რატომ გჭირდებათ ეს?</h3>
            <div className="space-y-2">
              {product.whyYouNeedThis.map((reason, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-600 dark:text-zinc-300 leading-normal">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            
            {/* Quantity controls */}
            <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 shrink-0 bg-white dark:bg-zinc-900">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="p-1 text-zinc-400 hover:text-black dark:hover:text-white"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="mx-4 text-sm font-bold font-mono">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                className="p-1 text-zinc-400 hover:text-black dark:hover:text-white"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`flex-1 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition ${
                isAdded 
                  ? "bg-green-500 text-white" 
                  : "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 cursor-pointer shadow-md"
              }`}
            >
              {isAdded ? "არჩეულია!" : "დაამატე კალათაში"}
            </button>

            <button 
              onClick={handleToggleWishlist}
              className={`px-4 py-3 border rounded-xl flex items-center justify-center transition ${
                isWishlisted 
                  ? "border-rose-300 text-rose-500 bg-rose-50/20" 
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
            >
              <Star className={`w-4 items-center h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>
          </div>

          {/* Tab Options */}
          <div className="border-b border-zinc-100 dark:border-zinc-800 p-0.5 flex gap-4 text-xs font-bold uppercase tracking-wider">
            <button 
              onClick={() => setActiveTab("specs")}
              className={`pb-2.5 transition relative ${activeTab === "specs" ? "text-amber-500 border-b-2 border-amber-500" : "text-zinc-400"}`}
            >
              სპეციფიკაციები
            </button>
            <button 
              onClick={() => setActiveTab("science")}
              className={`pb-2.5 transition relative ${activeTab === "science" ? "text-amber-500 border-b-2 border-amber-500" : "text-zinc-400"}`}
            >
              სამეცნიერო ფაქტები
            </button>
            <button 
              onClick={() => setActiveTab("faq")}
              className={`pb-2.5 transition relative ${activeTab === "faq" ? "text-amber-500 border-b-2 border-amber-500" : "text-zinc-400"}`}
            >
              FAQ
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="bg-zinc-50 dark:bg-zinc-950/25 border border-zinc-200/40 dark:border-zinc-800/60 rounded-2xl p-5 min-h-[148px]">
            
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {product.specs.map((spec, itemIdx) => (
                  <div key={itemIdx} className="border-b border-zinc-200/50 dark:border-zinc-800/50 pb-2 flex justify-between">
                    <span className="text-zinc-400 font-medium">{spec.label}:</span>
                    <span className="font-bold text-zinc-950 dark:text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "science" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-500">აკადემიური კვლევა:</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">{product.scientificProof.researchStudy}</p>
                </div>
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <span className="text-[10px] text-zinc-400 block mb-1">სამეცნიერო ინდიკატორები:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-medium">
                    {product.scientificProof.absurdStats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-white dark:bg-zinc-950 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800/60 flex flex-col justify-between">
                        <span className="text-zinc-400 text-[10px]">{stat.label}:</span>
                        <span className="font-extrabold text-amber-500">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-4 text-xs">
                {product.faq.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-1">
                    <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0" /> {q.q}
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-300 pl-4.5 font-sans leading-relaxed">{q.a}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Certifications lists */}
          <div className="flex flex-wrap gap-2 pt-2">
            {product.certifications.map((cert, cIdx) => (
              <span key={cIdx} className="inline-flex items-center gap-1 text-[10px] bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-sm border border-zinc-200/30 dark:border-zinc-700/30 leading-none">
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                {cert}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* REVIEWS HUB SECTION */}
      <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-10">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white flex items-center gap-2 font-sans mb-6">
          <MessageSquare className="w-5 h-5 text-amber-500" /> მომხმარებელთა გამოხმაურებები
        </h2>

        {/* Reviews Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List reviews */}
          <div className="lg:col-span-8 space-y-4">
            {productReviews.length === 0 ? (
              <div className="text-center py-10 bg-zinc-50 dark:bg-zinc-950/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-sm text-zinc-400">შეფასებები არ არის. იყავით პირველი, ვინც შეაფასებს ამ რევოლუციურ მოწყობილობას!</p>
              </div>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 rounded-2xl p-4.5 shadow-xs relative">
                  
                  {/* Actions to edit/delete */}
                  <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                    <button 
                      onClick={() => handleEditReview(rev)}
                      className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded transition"
                      title="რედაქტირება"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => deleteReview(rev.id)}
                      className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 rounded transition"
                      title="წაშლა"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <User className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-zinc-950 dark:text-white capitalize">{rev.author}</span>
                      <span className="block text-[9px] text-zinc-400 font-mono">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "text-amber-400 fill-amber-400" : "text-zinc-200 dark:text-zinc-700"}`} />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Review writing form */}
          <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/60 rounded-3xl p-5 shadow-xs">
            <h3 className="font-sans font-bold text-base text-zinc-950 dark:text-white mb-4">
              {editingReviewId ? "შეფასების რედაქტირება" : "დაწერე შეფასება"}
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">სახელი:</label>
                <input 
                  type="text" 
                  required
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  placeholder="თქვენი სახელი"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">შეფასება (ვარსკვლავი):</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button 
                      key={starVal}
                      type="button"
                      onClick={() => setReviewRating(starVal)}
                      className="p-1 text-zinc-300 hover:scale-110 transition"
                    >
                      <Star className={`w-5 h-5 ${starVal <= reviewRating ? "text-amber-400 fill-amber-400" : "text-zinc-300 dark:text-zinc-700"}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">კომენტარი:</label>
                <textarea 
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={4}
                  placeholder="რატომ არის ეს პროდუქტი თქვენი დილის ყველაზე დიდი სიურპრიზი?"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl text-xs transition"
              >
                {editingReviewId ? "შეცვლა" : "გაგზავნა"}
              </button>

              {editingReviewId && (
                <button 
                  type="button"
                  onClick={() => {
                    setEditingReviewId(null);
                    setReviewAuthor("");
                    setReviewComment("");
                  }}
                  className="w-full py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs hover:bg-zinc-300 transition"
                >
                  გაუქმება
                </button>
              )}

            </form>
          </div>

        </div>
      </div>

      {/* RECOMMENDATIONS SHELF ("CUSTOMERS ALSO BOUGHT") */}
      <div id="customers-also-bought-shelf" className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-10">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white font-sans mb-8">
          მომხმარებლები ასევე ყიდულობენ
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recProd) => {
            const isRecWish = wishlist.includes(recProd.id);
            return (
              <div 
                key={recProd.id}
                onClick={() => onSelectProduct(recProd)}
                className="border border-zinc-100 dark:border-zinc-800 hover:border-amber-400/30 rounded-2xl p-4 bg-white dark:bg-zinc-900 cursor-pointer group flex items-center gap-4 transition shadow-xs hover:shadow-md"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-tr ${recProd.image} flex items-center justify-center shrink-0 text-3xl`}>
                  {recProd.id === "smart-rock-tracker" && "🪨"}
                  {recProd.id === "transparent-toaster" && "🍞"}
                  {recProd.id === "bluetooth-banana-holder" && "🍌"}
                  {recProd.id === "solar-flashlight" && "🔦"}
                  {recProd.id === "anti-procrastination-hammer" && "🔨"}
                  {recProd.id === "keyboard-for-cats" && "🐈"}
                  {recProd.id === "usb-spoon-warmer" && "🥄"}
                  {recProd.id === "wifi-umbrella" && "☔"}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans font-bold text-sm text-zinc-950 dark:text-white group-hover:text-amber-500 transition truncate">
                    {recProd.name}
                  </h4>
                  <span className="text-[10px] text-zinc-400 block mt-0.5 line-clamp-1 italic">
                    „{recProd.marketingTagline}“
                  </span>
                  <span className="block font-bold text-sm text-zinc-950 dark:text-zinc-100 mt-1">₾{recProd.price}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:translate-x-1 transition shrink-0" />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
