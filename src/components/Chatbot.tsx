import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, X, RefreshCw } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "სალამი! მე ვარ ჩვენი ექსკლუზიური მაღაზიის უფროსი ტექნოლოგიური მრჩეველი. შეგიძლიათ დამისვათ ნებისმიერი კითხვა ჩვენს უახლეს და უმაღლესი სიზუსტის კომპლექტებზე - როგორიცაა ჭკვიანი ქვის ტრეკერი თუ მზის ქოლგა. რატომ გსურთ თქვენი ყოველდღიურობის იდეალურად სინქრონიზაცია?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage;
    // Append user message immediately
    const userMsg: ChatMessage = {
      id: "msg-" + Math.random(),
      role: "user",
      text: userText
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Map prior messages into correct structures for backend
      const historyContext = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userText,
          history: historyContext
        })
      });

      const data = await res.json();
      
      const responseMsg: ChatMessage = {
        id: "msg-" + Math.random(),
        role: "model",
        text: data.text || "ბოდიშს ვიხდი, ჩემი კავშირგაბმულობის მავთულები აირია. გთხოვთ სცადოთ მოგვიანებით!"
      };

      setMessages((prev) => [...prev, responseMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: "msg-" + Math.random(),
        role: "model",
        text: "ქსელის კავშირი გაწყდა. ჩვენი ინჟინრები Wi-Fi ქოლგის ქვეშ მუშაობენ მის აღსადგენად!"
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "init",
        role: "model",
        text: "ჩემი კოგნიტური მოდული წარმატებით დარესტარდა! კიდევ რომელი უსარგებლო, თუმცა უმნიშვნელოვანესი პროდუქტი გაინტერესებთ?"
      }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      
      {/* Mini Chat Window Layout */}
      {isOpen && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-[320px] sm:w-[380px] h-[480px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200 mb-3">
          
          {/* Elite Sales Header */}
          <div className="bg-zinc-950 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500">AI Genius Advisor</h4>
                <p className="text-[10px] text-zinc-400">უსერიოზულესი გაყიდვების მრჩეველი</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={handleResetChat}
                className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition"
                title="ჩატის გასუფთავება"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 dark:bg-zinc-950/40">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <span className="text-[9px] text-zinc-400 font-medium mb-0.5">
                  {m.role === "user" ? "თქვენ" : "AI კონსულტანტი"}
                </span>
                <div 
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                    m.role === "user" 
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium rounded-tr-none" 
                      : "bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 border border-zinc-100 dark:border-zinc-700/60 rounded-tl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Waiting loader spinner */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-zinc-400 font-medium mb-0.5">AI კონსულტანტი ფიქრობს...</span>
                <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center border border-zinc-100 dark:border-zinc-700/60">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Type Message Footer Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-1.5 items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="დაწერე შეკითხვა (მაგ. რატომ მჭირდება ქვის გაჯეტი?)"
              className="flex-1 px-3 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-800"
            />
            <button 
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white rounded-xl transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Main floating bubble toggle button if not open */}
      {!isOpen && (
        <button 
          id="btn-chatbot-float"
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 text-white p-4 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform cursor-pointer relative"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            Online
          </span>
        </button>
      )}

    </div>
  );
}
