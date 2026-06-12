import React, { useState } from "react";
import { useStore } from "../store";
import { 
  User, 
  Mail, 
  Lock, 
  ShoppingBag, 
  ChevronRight, 
  Truck, 
  LogOut,
  Calendar
} from "lucide-react";

export default function UserProfile() {
  const { user, loginUser, logoutUser } = useStore();

  // Signon Mode State "login" or "signup"
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [fullNameInput, setFullNameInput] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  // Tracking detailed order ID state
  const [selectedOrderID, setSelectedOrderID] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!emailInput.trim() || !passwordInput.trim()) {
      setErrorMsg("გთხოვთ შეავსოთ ველები!");
      return;
    }

    if (mode === "login") {
      const displayUserName = emailInput.split("@")[0];
      loginUser(displayUserName, emailInput);
    } else {
      if (!fullNameInput.trim()) {
        setErrorMsg("მიუთითეთ სრული სახელი.");
        return;
      }
      loginUser(fullNameInput, emailInput);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setEmailInput("");
    setPasswordInput("");
    setFullNameInput("");
    setSelectedOrderID(null);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 pt-28 pb-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xl space-y-6 animate-in fade-in zoom-in-95">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/40 text-amber-500 rounded-full flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h1 className="font-sans font-bold text-xl text-zinc-950 dark:text-white">
              {mode === "login" ? "ავტორიზაცია" : "ახალი ანგარიშის შექმნა"}
            </h1>
            <p className="text-xs text-zinc-400">
              შემოუერთდით უსარგებლო ინოვაციების ექსკლუზიურ კლუბს.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === "signup" && (
              <div>
                <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">სრული სახელი:</label>
                <div className="relative">
                  <input 
                    type="text"
                    required
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    placeholder="მაგ. ნიკოლოზ კოპალეიშვილი"
                    className="w-full px-4 py-2 pl-10 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-white"
                  />
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">ელ-ფოსტა:</label>
              <div className="relative">
                <input 
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2 pl-10 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-white"
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-400 font-bold uppercase mb-1">პაროლი:</label>
              <div className="relative">
                <input 
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 pl-10 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-white"
                />
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {errorMsg && (
              <p className="text-[10px] text-red-500 font-bold leading-normal">{errorMsg}</p>
            )}

            <button 
              type="submit"
              className="w-full py-2.5 bg-zinc-950 dark:bg-white hover:opacity-90 text-white dark:text-zinc-950 font-bold rounded-xl text-xs transition"
            >
              {mode === "login" ? "შესვლა" : "რეგისტრაცია"}
            </button>

          </form>

          <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button 
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setErrorMsg("");
              }}
              className="text-[11px] text-amber-500 font-bold hover:underline"
            >
              {mode === "login" ? "არ გაქვთ ანგარიში? შექმენით აქ" : "გაქვთ ანგარიში? შედით აქ"}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Display user account info for authenticated session
  const userOrders = user.orders || [];
  const activeDetailOrder = userOrders.find((o) => o.id === selectedOrderID);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* User Stats Card Column */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="text-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white text-xl font-extrabold flex items-center justify-center mx-auto mb-3 shadow-md uppercase">
              {user.fullName.slice(0, 2)}
            </div>
            <h3 className="font-sans font-bold text-base text-zinc-950 dark:text-white capitalize">
              {user.fullName}
            </h3>
            <span className="text-[11px] text-zinc-400 font-mono italic">{user.email}</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">კლუბის სტატუსი:</span>
              <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-500 font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase">
                Premium Absurdist
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">შეკვეთების ჯამი:</span>
              <span className="font-bold underline">{userOrders.length}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-300 hover:text-red-500 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" /> სისტემიდან გამოსვლა
          </button>
        </div>

        {/* Order History column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs">
            
            <h2 className="font-sans font-bold text-base text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
              <ShoppingBag className="w-4.5 h-4.5 text-amber-500" /> შეკვეთების ისტორია
            </h2>

            {userOrders.length === 0 ? (
              <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-950/30 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <p className="text-xs text-zinc-400">შეკვეთები ჯერ არ გაგიფორმებიათ. შეარჩიეთ პროდუქტები კატალოგიდან!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((o) => (
                  <div 
                    key={o.id}
                    onClick={() => setSelectedOrderID(o.id)}
                    className={`border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-4 cursor-pointer hover:border-amber-400/40 transition flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/20 ${selectedOrderID === o.id ? "ring-2 ring-amber-400/40 border-transparent gap-2" : ""}`}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/40 rounded-xl flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-zinc-950 dark:text-white block">ID: {o.id}</span>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" /> {o.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="block font-bold text-xs text-zinc-950 dark:text-white">₾{o.totalPrice}</span>
                        <span className="block text-[9.5px] uppercase font-bold text-amber-500">
                          {o.status === "delivered" ? "ჩაბარებულია" : "გზაშია"}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-300" />
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Active selected order shipping updates */}
          {activeDetailOrder && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 rounded-3xl p-6 shadow-md space-y-4 animate-in fade-in transition duration-300">
              <h3 className="font-sans font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-500 animate-pulse" /> შეკვეთის live თრექინგი: #{activeDetailOrder.id}
              </h3>
              
              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-extrabold text-zinc-400 block mb-1">სტატუსის ინფორმაცია:</span>
                  <p className="font-sans text-zinc-600 dark:text-zinc-300 leading-normal">
                    📍 <b>ლოგისტიკური სტატუსი:</b> მიმდინარეობს მოწყობილობის განსაზღვრა. მიწოდების სავარაუდო დრო: 2 წუთი ფსიქოლოგიური სინქრონიზაციით.
                  </p>
                  <span className="block text-[10px] text-zinc-400 mt-2 font-mono">Tracking ID: {activeDetailOrder.trackingNumber}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">შეკვეთილი ნივთები:</span>
                  {activeDetailOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-dashed border-zinc-100 dark:border-zinc-800 pb-1.5 font-sans">
                      <span>{item.name} (x{item.quantity})</span>
                      <span className="font-bold font-mono text-zinc-900 dark:text-white">₾{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
