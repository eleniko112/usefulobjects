import React, { useState } from "react";
import { useStore } from "../store";
import { Order } from "../types";
import { 
  CheckCircle, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  ShoppingBag,
  Sparkles,
  ArrowLeft
} from "lucide-react";

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { cart, activeCoupon, createOrder, user } = useStore();
  
  // Checkout Form State
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("თბილისი");
  const [address, setAddress] = useState("");
  
  // Successful checkout step
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [trackingStep, setTrackingStep] = useState(1); // 1 = sorting, 2 = transit, 3 = delivered

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = activeCoupon ? (subtotal * activeCoupon.discountPercentage) / 100 : 0;
  const total = subtotal - discountAmount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) return;

    const ord = createOrder({
      fullName,
      phone,
      city,
      address
    });

    if (ord) {
      setPlacedOrder(ord);
      // Simulate shipment tracking step increments
      setTimeout(() => setTrackingStep(2), 5000);
      setTimeout(() => setTrackingStep(3), 12000);
    }
  };

  if (placedOrder) {
    // Elegant receipt and interactive tracking route
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-8 animate-in fade-in zoom-in-95">
        
        {/* Success header banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-green-100 dark:bg-green-950/40 text-green-500 rounded-full">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
            შეკვეთა წარმატებით გაფორმდა!
          </h1>
          <p className="text-xs text-zinc-400">
            შეკვეთის იდენტიფიკატორი: <span className="font-bold text-zinc-950 dark:text-white font-mono">{placedOrder.id}</span>
          </p>
        </div>

        {/* Humorous Live Shipping Tracking Simulator */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs space-y-6">
          <h2 className="font-sans font-bold text-base text-zinc-950 dark:text-white flex items-center gap-2">
            <Truck className="w-4.5 h-4.5 text-amber-500 animate-bounce" /> live მიწოდების სტატუსი
          </h2>

          {/* Graphical visual line dots */}
          <div className="relative flex justify-between items-center max-w-md mx-auto py-4">
            
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800 -z-10"></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-amber-500 -z-10 transition-all duration-1000"
              style={{ width: trackingStep === 1 ? "10%" : trackingStep === 2 ? "50%" : "100%" }}
            ></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ${
                trackingStep >= 1 ? "bg-amber-500 text-white ring-amber-100 dark:ring-amber-950" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 ring-transparent"
              }`}>
                1
              </div>
              <span className="text-[10px] font-bold mt-2 text-zinc-800 dark:text-zinc-200">სორტირება</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ${
                trackingStep >= 2 ? "bg-amber-500 text-white ring-amber-100 dark:ring-amber-950" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 ring-transparent"
              }`}>
                2
              </div>
              <span className="text-[10px] font-bold mt-2 text-zinc-800 dark:text-zinc-200">ტრანზიტი</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ${
                trackingStep >= 3 ? "bg-amber-500 text-white ring-amber-100 dark:ring-amber-950" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 ring-transparent"
              }`}>
                3
              </div>
              <span className="text-[10px] font-bold mt-2 text-zinc-800 dark:text-zinc-200">ჩაბარებული</span>
            </div>

          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-xs">
            <span className="text-zinc-400 block font-semibold uppercase text-[10px]">ლოგისტიკური პუნქტი:</span>
            {trackingStep === 1 && (
              <p className="text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                📍 <b>თბილისის კოსმოსური სორტირების ცენტრი:</b> ჩვენმა რობოტულმა მკლავმა წარმატებით დაასკანირა თქვენი შეკვეთა. მოწყობილობას უტარდება უსარგებლო კალიბრაცია, რათა დავრწმუნდეთ, რომ იგი ნამდვილად არ იმუშავებს მიწოდებისას.
              </p>
            )}
            {trackingStep === 2 && (
              <p className="text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                🚀 <b>კვანტური ტრანზიტი:</b> კურიერი უახლოვდება თქვენს მისამართს საფრენი ხალიჩის დროებითი პროტოტიპით. გთხოვთ გადმოიხედოთ ფანჯრიდან და იყვიროთ „სინათლის სისწრაფე!“.
              </p>
            )}
            {trackingStep === 3 && (
              <p className="text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                🚁 <b>დანიშნულების ადგილი ჩაბარებულია:</b> გილოცავთ! თქვენი აბსურდული ნივთი ჩაბარებულია თქვენს კარს მიღმა. გთხოვთ მოეპყრათ მას სათანადო კატეგორიული სიმტკიცით.
              </p>
            )}
            <span className="block text-[10px] text-zinc-400 font-mono">თრექინგის ნომერი: {placedOrder.trackingNumber}</span>
          </div>

        </div>

        {/* Receipt summary */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-sans font-bold text-sm text-zinc-950 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-800">
            ანგარიშფაქტურა
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold flex-row items-center">
              <span>მყიდველი:</span>
              <span className="text-zinc-600 dark:text-zinc-300 font-medium">{placedOrder.shippingAddress.fullName}</span>
            </div>
            <div className="flex justify-between flex-row items-center">
              <span>მიწოდების მისამართი:</span>
              <span className="text-zinc-650 dark:text-zinc-300 font-sans">
                {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.address}
              </span>
            </div>
            <div className="flex justify-between flex-row items-center font-sans">
              <span>ტელეფონი:</span>
              <span className="text-zinc-650 dark:text-zinc-450 font-mono">{placedOrder.shippingAddress.phone}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-sm font-extrabold text-zinc-950 dark:text-white">
              <span>სულ გადახდილია:</span>
              <span className="text-amber-500 font-mono">₾{placedOrder.totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => onNavigate("home")}
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-zinc-950 font-bold rounded-xl text-xs transition hover:opacity-90"
          >
            მთავარ გვერდზე დაბრუნება
          </button>
        </div>

      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center space-y-4">
        <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">შეკვეთა გაფორმებულია ან კალათა ცარიელია!</h2>
        <button onClick={() => onNavigate("home")} className="px-5 py-2 bg-black text-white rounded-lg text-xs font-bold">მთავარი</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      
      {/* Back to Cart link */}
      <button 
        onClick={() => onNavigate("cart")}
        className="mb-6 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white font-semibold transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> კალათაში დაბრუნება
      </button>

      <h1 className="font-sans font-bold text-2xl sm:text-3xl text-zinc-950 dark:text-white mb-8">
        ინოვაციური მიწოდების გაფორმება
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Adress Form */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs">
          <h2 className="font-sans font-bold text-lg text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4.5 h-4.5 text-zinc-400" /> მიმღების მონაცემები
          </h2>

          <form onSubmit={handleSubmitOrder} className="space-y-4">
            
            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">
                სრული სახელი:
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="მაგ. გიორგი ბებურიშვილი"
                  className="w-full px-4 py-2.5 pl-10 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-white"
                />
                <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">
                  ქალაქი:
                </label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-white"
                >
                  <option value="თბილისი">თბილისი</option>
                  <option value="ბათუმი">ბათუმი</option>
                  <option value="ქუთაისი">ქუთაისი</option>
                  <option value="რუსთავი">რუსთავი</option>
                  <option value="ზუგდიდი">ზუგდიდი</option>
                  <option value="გორი">გორი</option>
                  <option value="თელავი">თელავი</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">
                  მობილურის ნომერი:
                </label>
                <div className="relative">
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="მაგ. 599 12 34 56"
                    className="w-full px-4 py-2.5 pl-10 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-white"
                  />
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

            </div>

            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">
                ზუსტი მიწოდების მისამართი:
              </label>
              <textarea 
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                placeholder="ქუჩა, ბინის ნომერი, კორპუსი, სადარბაზო"
                className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-white"
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-3 bg-zinc-950 dark:bg-white hover:opacity-90 text-white dark:text-zinc-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} /> 
                შეკვეთის დადასტურება (უსაფრთხო გადახდა)
              </button>
            </div>

          </form>
        </div>

        {/* Invoice Summary */}
        <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/60 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="font-sans font-bold text-sm text-zinc-950 dark:text-white pb-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-zinc-400" /> ნივთები კალათაში
          </h2>
          
          <div className="max-h-56 overflow-y-auto pr-1 space-y-3.5">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3 justify-between text-xs pb-3 border-b border-zinc-100 dark:border-zinc-800/60 last:border-b-0">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block">{item.product.name}</span>
                  <span className="text-zinc-400 text-[10px] block">რაოდენობა: {item.quantity} ერთეული</span>
                </div>
                <span className="font-bold font-mono text-zinc-950 dark:text-zinc-100">₾{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs space-y-1.5">
            <div className="flex justify-between text-zinc-400">
              <span>ჯამი ფასდაკლებამდე:</span>
              <span className="font-mono">₾{subtotal}</span>
            </div>
            {activeCoupon && (
              <div className="flex justify-between text-green-600 dark:text-green-400 font-bold">
                <span>პრომო-ფასდაკლება ({activeCoupon.discountPercentage}%):</span>
                <span className="font-mono">-₾{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>მიწოდება კართან:</span>
              <span className="text-green-500 font-bold uppercase text-[10px]">უფასო</span>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-sm font-extrabold text-zinc-950 dark:text-white">
              <span>საბოლოო ფასი:</span>
              <span className="font-mono text-lg text-amber-500">₾{total}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
