import { useState, useEffect } from "react";
import { Sparkles, Gift, Copy, Check } from "lucide-react";
import { useStore } from "../store";

const PRIZES = [
  { code: "ABSURD50", label: "50% ფასდაკლება", color: "bg-red-500" },
  { code: "USELESS99", label: "99% ფასდაკლება (ჯეკპოტი)", color: "bg-amber-500" },
  { code: "ABSURD50", label: "50% ფასდაკლება", color: "bg-pink-500" },
  { code: "GEORGIAECO", label: "30% ეკო-ფასდაკლება", color: "bg-green-500" },
  { code: "ABSURD50", label: "50% ფასდაკლება", color: "bg-blue-500" },
  { code: "GEORGIAECO", label: "30% ეკო-ფასდაკლება", color: "bg-indigo-500" },
];

export default function SpinWheel() {
  const { applyCoupon } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prizeWon, setPrizeWon] = useState<typeof PRIZES[0] | null>(null);
  const [copied, setCopied] = useState(false);

  // Trigger spin wheel popup after 8 seconds of entering the page
  useEffect(() => {
    const hasSpunBefore = localStorage.getItem("useless-wheel-spun");
    if (!hasSpunBefore) {
      const timeout = setTimeout(() => {
        setIsOpen(true);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrizeWon(null);

    // Turn 4 to 8 full circles plus a random index offset
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const degreesPerPrize = 360 / PRIZES.length;
    const additionalDegrees = prizeIndex * degreesPerPrize;
    const totalRotation = rotation + 1800 + additionalDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const won = PRIZES[(PRIZES.length - prizeIndex - 1 + PRIZES.length) % PRIZES.length];
      setPrizeWon(won);
      applyCoupon(won.code);
      localStorage.setItem("useless-wheel-spun", "true");
    }, 4000); // 4-second spin animation matches transition below
  };

  const handleCopyCode = () => {
    if (!prizeWon) return;
    navigator.clipboard.writeText(prizeWon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) {
    // Elegant floating button to let them trigger the wheel manually
    return (
      <button 
        id="btn-trigger-spin-wheel"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-zinc-900 border border-zinc-700/80 dark:bg-white text-white dark:text-zinc-950 p-3 rounded-full flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        title="გახსენი იღბლის ბორბალი"
      >
        <Gift className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
        <span className="text-xs font-bold font-sans hidden sm:inline">ფასდაკლების ბორბალი</span>
      </button>
    );
  }

  return (
    <div id="spin-wheel-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center">
        
        <button 
          id="btn-close-spin-wheel"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
        >
          ✕
        </button>

        <div className="space-y-4">
          <div className="inline-flex p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-500 rounded-full">
            <Gift className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-sans font-bold text-xl text-zinc-900 dark:text-white">
            უსარგებლო იღბლის ბორბალი
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
            დაატრიალეთ და მოიგეთ ულტრა-პრემიუმ ფასდაკლების კოდი, რომელსაც გამოიყენებთ მსოფლიოში ყველაზე აბსურდული ნივთების შესაძენად!
          </p>

          {/* Graphical Spin Wheel Canvas using CSS */}
          <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
            
            {/* Indication Arrow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-b-lg border-2 border-white dark:border-zinc-900 shadow-md rotate-180 z-20"></div>

            {/* The circular wheel */}
            <div 
              id="wheel-circle-element"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 4s cubic-bezier(0.15, 0.85, 0.35, 1)" : "none"
              }}
              className="w-full h-full rounded-full border-4 border-zinc-900 dark:border-zinc-100 relative overflow-hidden transition-transform shadow-inner flex items-center justify-center bg-zinc-100"
            >
              {/* Slices of colors */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="bg-gradient-to-tr from-amber-400 to-amber-500 border-r border-b border-zinc-950"></div>
                <div className="bg-gradient-to-tr from-red-400 to-red-500 border-l border-b border-zinc-950"></div>
                <div className="bg-gradient-to-tr from-blue-400 to-blue-500 border-r border-t border-zinc-950"></div>
                <div className="bg-gradient-to-tr from-green-400 to-green-500 border-l border-t border-zinc-950"></div>
              </div>

              {/* Central hub */}
              <div className="absolute w-8 h-8 bg-zinc-900 dark:bg-white rounded-full z-10 border-2 border-white dark:border-zinc-900" />
            </div>

            {/* Wheel Pointer Spin Button Overlay */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white bg-zinc-950 dark:bg-zinc-100 text-white dark:text-black font-extrabold text-xs flex items-center justify-center cursor-pointer shadow-lg z-30 select-none ${
                isSpinning ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
              }`}
            >
              SPIN!
            </button>
          </div>

          {/* Results Block */}
          {prizeWon && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 animate-in fade-in transition-all">
              <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest block mb-0.5">
                გილოცავთ! თქვენ მოიგეთ:
              </span>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">
                {prizeWon.label}
              </p>
              
              {/* Coupon Row with Copy */}
              <div className="flex items-center justify-between mt-3 bg-white dark:bg-zinc-800 p-2 rounded-xl border border-zinc-100 dark:border-zinc-700/60 font-mono text-zinc-800 dark:text-zinc-100 text-xs">
                <span className="font-extrabold">{prizeWon.code}</span>
                <button 
                  onClick={handleCopyCode}
                  className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg flex items-center gap-1 text-[11px] font-bold text-zinc-600 dark:text-zinc-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" /> კოპირებულია
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> კოპირება
                    </>
                  )}
                </button>
              </div>
              <p className="text-[10px] text-zinc-400 mt-2">
                კუპონი ავტომატურად გააქტიურებულია თქვენს ამჟამინდელ კალათაზე!
              </p>
            </div>
          )}

          {!prizeWon && (
            <button 
              onClick={handleSpin}
              disabled={isSpinning}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-semibold rounded-xl text-xs transition"
            >
              {isSpinning ? "დატრიალება..." : "სცადე ბედი"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
