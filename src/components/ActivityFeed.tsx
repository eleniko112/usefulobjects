import { useState, useEffect } from "react";
import { ActivityNotification } from "../types";
import { ShoppingBag, X } from "lucide-react";

const CITIES = [
  "თბილისი", "ბათუმი", "ქუთაისი", "რუსთავი", "ზუგდიდი", "გორი", "თელავი", "ფოთი", "ამბროლაური", "ახალციხე"
];

const ACTIONS = [
  "შეიძინა „ჭკვიანი ქვის ტრეკერი 2.0“",
  "ახლახან დააკვირდა „ულტრა-ოპტიკურ გამჭვირვალე ტოსტერს“",
  "რჩეულებში დაამატა „კლავიატურა კატებისთვის“",
  "შეუკვეთა „ჰოლისტიკური Bluetooth ბანანის დამჭერი x3“",
  "შეიძინა „ჰიბრიდული მზის ენერგიის ფანარი“",
  "გამოიყენა 50%-იანი კოდი და იყიდა „განგაშის ჩაქუჩი“",
  "შეიძინა „ატმოსფერული WiFi ქოლგა Pro“"
];

export default function ActivityFeed() {
  const [activeNotification, setActiveNotification] = useState<ActivityNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show a new notification every 15-25 seconds
    const triggerNotification = () => {
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      
      setActiveNotification({
        id: "notif-" + Math.random(),
        city,
        productName: action,
        timeAgo: "ახლახან"
      });
      setIsVisible(true);

      // Hide notification after 5.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    };

    // Initial delay, then interval
    const timeout = setTimeout(triggerNotification, 4000);
    const interval = setInterval(triggerNotification, 18000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!activeNotification) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-40 max-w-sm w-full bg-white/95 dark:bg-zinc-900/95 shadow-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
          <ShoppingBag className="w-4.5 h-4.5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-400 capitalize">
            საცალო აქტივობა საქართველოში
          </p>
          <p className="text-[12.5px] text-zinc-800 dark:text-zinc-200 font-medium">
            მომხმარებელმა ქალაქიდან <span className="font-bold text-zinc-900 dark:text-white">{activeNotification.city}</span> {activeNotification.productName}
          </p>
          <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">
            {activeNotification.timeAgo}
          </span>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
