import React, { useState } from "react";
import { useStore } from "../store";
import { Product, Review } from "../types";
import { 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Layers, 
  MessageSquare, 
  CheckCircle, 
  Sparkles,
  ShoppingBag,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function Dashboard() {
  const { 
    products, 
    reviews, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    deleteReview, 
    approveReview 
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<"analytics" | "products" | "reviews">("analytics");
  
  // Product Creation/Edition State
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(99);
  const [originalPrice, setOriginalPrice] = useState(150);
  const [category, setCategory] = useState("სმარტ-ტექნოლოგიები");
  const [marketingTagline, setMarketingTagline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("from-slate-200 to-stone-400");
  const [stock, setStock] = useState(5);
  const [uselessnessRating, setUselessnessRating] = useState(10);

  const resetForm = () => {
    setIsEditing(false);
    setEditingProductId(null);
    setName("");
    setPrice(99);
    setOriginalPrice(150);
    setCategory("სმარტ-ტექნოლოგიები");
    setMarketingTagline("");
    setDescription("");
    setImage("from-slate-200 to-stone-400");
    setStock(5);
    setUselessnessRating(10);
  };

  const handleCreateOrUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !marketingTagline.trim()) return;

    if (isEditing && editingProductId) {
      const existing = products.find((p) => p.id === editingProductId);
      if (existing) {
        updateProduct({
          ...existing,
          name,
          price: Number(price),
          originalPrice: Number(originalPrice),
          category,
          marketingTagline,
          description,
          image,
          stock: Number(stock),
          uselessnessRating: Number(uselessnessRating)
        });
      }
    } else {
      const newId = "prod-" + Math.floor(Math.random() * 900000 + 100000);
      const newProduct: Product = {
        id: newId,
        name,
        englishName: name,
        category,
        description,
        marketingTagline,
        price: Number(price),
        originalPrice: Number(originalPrice),
        rating: 5.0,
        uselessnessRating: Number(uselessnessRating),
        image,
        iconName: "Sparkles",
        stock: Number(stock),
        isFeatured: false,
        isTrending: false,
        scientificProof: {
          researchStudy: "ჩვენი ლაბორატორიული კვლევით დადასტურდა ამ ნივთის სრული უსარგებლობა. მომხმარებელთა 100% კმაყოფილია მისი პრემიუმ ესთეტიკით.",
          laboratory: "საქართველოს ეროვნული გეო-აბსურდის ცენტრი",
          absurdStats: [
            { label: "უმოქმედობა", value: "99% წამში" },
            { label: "ინტუიციურობა", value: "0" }
          ]
        },
        whyYouNeedThis: [
          "სოციალურ ქსელში საოცარი ფოტოს გადასაღებად.",
          "სტუმრების გასაოცებლად.",
          "უბრალოდ იმიტომ, რომ შეგიძლიათ!"
        ],
        expertEndorsement: {
          expertName: "დოქტორი ფეიკ ადვოკატი",
          expertTitle: "აბსურდოლოგი",
          quote: "ჩემი პრაქტიკის განმავლობაში მსგავსი უაზრობა ჯერ არ შემხვედრია. მყისიერად შევიძინე!"
        },
        certifications: ["Certified Absurd Quality Level A"],
        faq: [
          { q: "მუშაობს?", a: "კატეგორიულად არა! ეს არის მისი მთავარი უპირატესობა." }
        ],
        specs: [
          { label: "წონა", value: "მსუბუქი" },
          { label: "თავსებადობა", value: "სამყაროს კანონებთან" }
        ]
      };
      addProduct(newProduct);
    }
    resetForm();
  };

  const handleEditInit = (p: Product) => {
    setIsEditing(true);
    setEditingProductId(p.id);
    setName(p.name);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setCategory(p.category);
    setMarketingTagline(p.marketingTagline);
    setDescription(p.description);
    setImage(p.image);
    setStock(p.stock);
    setUselessnessRating(p.uselessnessRating);
  };

  // Simulated Analytics metrics using state lengths
  const activeProductsCount = products.length;
  const pendingReviewsCount = reviews.filter((r) => !r.isApproved).length;
  const approvedReviewsCount = reviews.filter((r) => r.isApproved).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
            ადმინისტრატორის პანელი
          </h1>
          <p className="text-xs text-zinc-400">
            უსარგებლო იმპერიის მართვა და live ანალიტიკა.
          </p>
        </div>

        {/* Tab triggers */}
        <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl flex gap-1 text-xs font-semibold">
          <button 
            onClick={() => setActiveSubTab("analytics")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${activeSubTab === "analytics" ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-xs" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"}`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> ანალიტიკა
          </button>
          <button 
            onClick={() => setActiveSubTab("products")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${activeSubTab === "products" ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-xs" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"}`}
          >
            <Layers className="w-3.5 h-3.5" /> პროდუქტები ({activeProductsCount})
          </button>
          <button 
            onClick={() => setActiveSubTab("reviews")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition relative ${activeSubTab === "reviews" ? "bg-white dark:bg-zinc-900 text-black dark:text-white shadow-xs" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"}`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> რეცენზიები
            {pendingReviewsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 animate-ping"></span>
            )}
          </button>
        </div>
      </div>

      {/* SUB TAB: ANALYTICS DASHBOARD */}
      {activeSubTab === "analytics" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase mb-1">ჯამური გაყიდვები (simulated)</span>
              <p className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">₾1,424,560</p>
              <span className="text-[10px] text-green-500 font-bold block mt-2">↑ 412% ამ კვირაში</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase mb-1">აქტიური პროდუქტი</span>
              <p className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">{activeProductsCount}</p>
              <span className="text-[10px] text-zinc-400 block mt-2">ლიმიტი: 1,000,000 ცალი</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase mb-1">კონვერსიის კოეფიციენტი</span>
              <p className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">99.8%</p>
              <span className="text-[10px] text-zinc-400 block mt-2">ყველას უნდა აბსურდული ნივთი</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] font-bold text-zinc-400 block uppercase mb-1">აქტიური შეფასებები</span>
              <p className="text-2xl font-bold font-sans text-zinc-900 dark:text-white">{reviews.length}</p>
              <span className="text-[10px] text-blue-500 font-bold block mt-2">{approvedReviewsCount} დამტკიცებული რეცენზია</span>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs">
              <h3 className="font-sans font-bold text-sm text-zinc-950 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" /> გაყიდვების დინამიკა (12-საათიანი კვანტური ლოგი)
              </h3>
              
              <div className="h-44 flex items-end gap-2.5 pt-4">
                {[45, 90, 75, 120, 150, 80, 240, 310, 180, 290, 350, 420].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-zinc-800 to-amber-500 dark:from-zinc-950 dark:to-white rounded-t-lg transition-all duration-1000"
                      style={{ height: `${(val / 420) * 120}px` }}
                    ></div>
                    <span className="text-[8px] text-zinc-400 font-mono font-bold">1{idx}:00</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-sm text-zinc-950 dark:text-white pb-3 border-b border-zinc-100/50 mb-1">
                  კატეგორიების წილი
                </h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
                    <span>📱 სმარტ-ტექნოლოგიები</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
                    <span>🍳 საოჯახო ტექნიკა</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg">
                    <span>⛺ ექსტრემალური / გარე</span>
                    <span className="font-bold">25%</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-100/40 p-3.5 border border-amber-200/50 rounded-2xl text-[10.5px] leading-relaxed text-zinc-600 flex gap-1.5 items-start">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <p>სერვერის ქეში ავტომატურად სინქრონიზდება <b>Zustand</b> და <b>localStorage</b> მეხსიერებასთან. ყველა მონაცემი რეალურია თქვენს ბრაუზერში.</p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUB TAB: PRODUCT MANAGEMENT (ADD / EDIT / DELETE) */}
      {activeSubTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Create product form */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6">
            <h3 className="font-sans font-bold text-base text-zinc-950 dark:text-white mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
              {isEditing ? "გამოგონების რედაქტირება" : "ახალი გამოგონების დამატება"}
            </h3>

            <form onSubmit={handleCreateOrUpdateProduct} className="space-y-4">
              
              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">დასახელება (ქართულად):</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="მაგ. ჭკვიანი ჩაის მოსარევი"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">სარეკლამო ფასი (₾):</label>
                  <input 
                    type="number" 
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">ძველი ფასი (იმიტირებული ₾):</label>
                  <input 
                    type="number" 
                    required
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">კატეგორია:</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                  >
                    <option value="სმარტ-ტექნოლოგიები">სმარტ-ტექნოლოგიები</option>
                    <option value="საოჯახო ტექნიკა">საოჯახო ტექნიკა</option>
                    <option value="ექსტრემალური / გარე">ექსტრემალური / გარე</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">საწყისი მარაგი:</label>
                  <input 
                    type="number" 
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">სარეკლამო სლოგანი (Tagline):</label>
                <input 
                  type="text" 
                  required
                  value={marketingTagline}
                  onChange={(e) => setMarketingTagline(e.target.value)}
                  placeholder="„ეს ცვლის ყველაფერს. გარდა თქვენი ყოველდღიურობისა“"
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">აღწერა (ძალიან სერიოზული):</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="აღწერეთ მოწყობილობის სირთულე და აბსურდულობა აკადემიური სერიოზულობით..."
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">უმაქნისობა (1-10):</label>
                  <input 
                    type="number" 
                    min={1}
                    max={10}
                    required
                    value={uselessnessRating}
                    onChange={(e) => setUselessnessRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">CSS ფონის გრადიენტი:</label>
                  <input 
                    type="text" 
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="from-amber-100 to-indigo-100"
                    className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-xl text-xs transition"
                >
                  {isEditing ? "განახლება" : "დამატება"}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs transition"
                  >
                    გაუქმება
                  </button>
                )}
              </div>

            </form>
          </div>

          {/* Product grid table */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 overflow-hidden">
            <h3 className="font-sans font-bold text-sm text-zinc-950 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-850 mb-4">
              მაღაზიის აქტიური კატალოგი
            </h3>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div key={p.id} className="flex gap-4 items-center justify-between p-3.5 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/20">
                  <div className="flex gap-3 items-center min-w-0">
                    <div className={`w-11 h-11 rounded-lg bg-gradient-to-tr ${p.image} flex items-center justify-center text-xl shrink-0`}>
                      💡
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-zinc-950 dark:text-white block truncate">{p.name}</span>
                      <span className="text-[9.5px] text-zinc-400 block line-clamp-1 italic">„{p.marketingTagline}“</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <div>
                      <span className="block font-bold text-xs text-zinc-950 dark:text-white">₾{p.price}</span>
                      <span className="block text-[10px] text-zinc-400">მარაგი: {p.stock}</span>
                    </div>

                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => handleEditEdit(p)}
                        className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-400 hover:text-black dark:hover:text-zinc-100"
                        title="რედაქტირება"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 rounded text-zinc-400 hover:text-red-500"
                        title="წაშლა"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB TAB: REVIEW MODERATION */}
      {activeSubTab === "reviews" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 animate-in fade-in duration-200">
          <h3 className="font-sans font-bold text-sm text-zinc-950 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-850 mb-4">
            მომხმარებელთა შეფასებების კონტროლი
          </h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-zinc-400 text-sm">შეფასებები ჯერჯერობით არ გამოგზავნილა.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {reviews.map((rev) => (
                <div key={rev.id} className="border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-50/50 dark:bg-zinc-950/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-zinc-950 dark:text-white">{rev.author}</span>
                      <span className="text-[10px] text-zinc-400">({rev.date})</span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    
                    {/* Approve status wrapper */}
                    {rev.isApproved ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2.5 py-1 rounded">
                        <CheckCircle className="w-3.5 h-3.5" /> დამტკიცებულია
                      </span>
                    ) : (
                      <button 
                        onClick={() => approveReview(rev.id)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[10px] transition"
                      >
                        დამტკიცება
                      </button>
                    )}

                    <button 
                      onClick={() => deleteReview(rev.id)}
                      className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 rounded text-zinc-400 hover:text-red-500 transition"
                      title="წაშლა"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );

  function handleEditEdit(prod: Product) {
    handleEditInit(prod);
    setActiveSubTab("products");
  }
}
