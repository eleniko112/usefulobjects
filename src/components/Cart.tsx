import React, { useState } from "react";
import { useStore } from "../store";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Percent, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";

interface CartProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (product: any) => void;
}

export default function Cart({ onNavigate, onSelectProduct }: CartProps) {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    activeCoupon, 
    applyCoupon, 
    removeCoupon,
    clearCart 
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = activeCoupon ? (subtotal * activeCoupon.discountPercentage) / 100 : 0;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    
    setCouponError("");
    setCouponSuccess("");
    
    const result = applyCoupon(couponInput);
    if (result.success) {
      setCouponSuccess(result.message);
      setCouponInput("");
    } else {
      setCouponError(result.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center space-y-4">
        <div className="inline-flex p-6 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded-full">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="font-sans font-bold text-2xl text-zinc-900 dark:text-white">კალათა ცარიელია</h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-sm">
          თქვენს კალათაში ამჟამად არ არის არცერთი უმაქნისი ხელსაწყო. გადადით კატალოგში და შეარჩიეთ თქვენი იდეალური აბსურდი.
        </p>
        <button 
          onClick={() => onNavigate("catalog")}
          className="mt-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 rounded-xl font-bold text-sm transition"
        >
          კატალოგის დათვალიერება
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      
      <h1 className="font-sans font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white mb-8">
        თქვენი კალათა
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Cart Rows list */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const rowTotal = item.product.price * item.quantity;
            return (
              <div 
                key={item.product.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                {/* Visual block */}
                <div 
                  onClick={() => onSelectProduct(item.product)}
                  className="flex items-center gap-4 w-full sm:w-auto cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-tr ${item.product.image} flex items-center justify-center shrink-0 text-3xl transition duration-300 group-hover:scale-105`}>
                    {item.product.id === "smart-rock-tracker" && "🪨"}
                    {item.product.id === "transparent-toaster" && "🍞"}
                    {item.product.id === "bluetooth-banana-holder" && "🍌"}
                    {item.product.id === "solar-flashlight" && "🔦"}
                    {item.product.id === "anti-procrastination-hammer" && "🔨"}
                    {item.product.id === "keyboard-for-cats" && "🐈"}
                    {item.product.id === "usb-spoon-warmer" && "🥄"}
                    {item.product.id === "wifi-umbrella" && "☔"}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans font-bold text-sm text-zinc-950 dark:text-white group-hover:text-amber-500 transition leading-snug">
                      {item.product.name}
                    </h3>
                    <span className="text-[10px] text-zinc-400 capitalize block mt-0.5">
                      {item.product.category}
                    </span>
                  </div>
                </div>

                {/* Counter controls */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-1 bg-zinc-50/50 dark:bg-zinc-950/20">
                    <button 
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:text-red-500 text-zinc-400"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="mx-3.5 font-bold text-xs font-mono">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:text-black dark:hover:text-white text-zinc-400"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="text-xs text-zinc-400 block line-through">₾{item.product.originalPrice * item.quantity}</span>
                    <span className="font-bold text-sm text-zinc-950 dark:text-white font-mono">₾{rowTotal}</span>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 dark:hover:bg-red-950/20 rounded-xl transition"
                    title="წაშლა"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>
            );
          })}

          {/* Cart terms warn */}
          <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/50 rounded-2xl p-4 flex gap-3 text-xs leading-normal">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-zinc-500 dark:text-zinc-400">
              <b>შენიშვნა:</b> ჩვენი გამოგონებები იმდენად უნიკალურია, რომ მათი შეკვეთის შემდეგ შეიძლება მიიღოთ ბარათზე 80%-იანი მორალური კმაყოფილება, თუმცა რეალური ფიზიკური სარგებელი შეიძლება ნულს უტოლდებოდეს. თამამად განაგრძეთ!
            </p>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/60 rounded-3xl p-6 shadow-xs space-y-6">
            <h2 className="font-sans font-bold text-lg text-zinc-950 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800">
              შეკვეთის დეტალები
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>ჯამი ფასდაკლების გარეშე:</span>
                <span className="font-bold font-mono">₾{subtotal}</span>
              </div>
              
              {activeCoupon && (
                <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
                  <span>კუპონი (-{activeCoupon.discountPercentage}%):</span>
                  <span className="font-bold font-mono">-₾{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-500">
                <span>მიწოდება (სასაცილო კურკა):</span>
                <span className="font-extrabold text-green-600 dark:text-green-400">უფასო</span>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-base font-extrabold text-zinc-950 dark:text-white">
                <span>საბოლოო ფასი:</span>
                <span className="font-mono text-lg">₾{total}</span>
              </div>
            </div>

            {/* Coupon Code Input Form */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">გაქვთ პრომო კოდი?</span>
              
              {activeCoupon ? (
                <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-950 p-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                    <Percent className="w-3.5 h-3.5 text-green-500" />
                    <span>{activeCoupon.code} აქტიურია</span>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 font-bold text-[11px]"
                  >
                    წაშლა
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input 
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="მაგ. ABSURD50"
                    className="flex-1 px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-bold text-xs"
                  >
                    გამოყენება
                  </button>
                </form>
              )}

              {couponError && <p className="text-[10px] text-red-500 font-bold">{couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">{couponSuccess}</p>}
            </div>

            {/* Continue button */}
            <button 
              onClick={() => onNavigate("checkout")}
              className="w-full py-3 bg-zinc-950 dark:bg-white hover:opacity-90 text-white dark:text-zinc-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-102"
            >
              შეკვეთის გაფორმება
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
