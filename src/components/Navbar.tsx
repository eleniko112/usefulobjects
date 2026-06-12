import { useState, useEffect } from "react";
import { useStore } from "../store";
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  User, 
  Sparkles,
  ArrowLeftRight
} from "lucide-react";

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function Navbar({ onNavigate, currentPage, onSearch, searchQuery }: NavbarProps) {
  const { cart, wishlist, compareList, user, darkMode, toggleDarkMode } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle scroll shadow active
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav 
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md shadow-sm border-b border-zinc-100 dark:border-zinc-800" 
          : "bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            id="nav-logo"
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => { onNavigate("home"); setIsMobileMenuOpen(false); }}
          >
            <div className="w-9 h-9 bg-black dark:bg-white rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <Sparkles className="w-5 h-5 text-white dark:text-black" />
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-zinc-900 dark:text-white block leading-none">
                უსარგებლო
              </span>
              <span className="font-sans text-xs tracking-widest text-zinc-500 uppercase">
                გამოგონებები
              </span>
            </div>
          </div>

          {/* Search bar inside desktop navigation */}
          <div id="desktop-search-container" className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="მოძებნე აბსურდული ნივთი..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full border border-transparent focus:outline-none focus:bg-white focus:border-zinc-300 dark:focus:bg-zinc-900 dark:focus:border-zinc-700 transition"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <div id="desktop-menu" className="hidden md:flex items-center gap-6">
            <button 
              id="btn-nav-home"
              onClick={() => onNavigate("home")}
              className={`text-sm font-medium transition ${
                currentPage === "home" ? "text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              მთავარი
            </button>
            <button 
              id="btn-nav-catalog"
              onClick={() => onNavigate("catalog")}
              className={`text-sm font-medium transition ${
                currentPage === "catalog" ? "text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              კატალოგი
            </button>
            <button 
              id="btn-nav-compare"
              onClick={() => onNavigate("compare")}
              className={`text-sm font-medium transition relative flex items-center gap-1 ${
                currentPage === "compare" ? "text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              შედარება
              {compareList.length > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-none">
                  {compareList.length}
                </span>
              )}
            </button>
            <button 
              id="btn-nav-admin"
              onClick={() => onNavigate("admin")}
              className={`text-sm font-medium transition flex items-center gap-1 ${
                currentPage === "admin" ? "text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              ადმინი
            </button>
          </div>

          {/* Action Icons */}
          <div id="desktop-icons" className="flex items-center gap-4">
            {/* Dark Mode */}
            <button 
              id="btn-dark-mode"
              onClick={toggleDarkMode}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition"
              title="თემის შეცვლა"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <button 
              id="btn-wishlist-view"
              onClick={() => onNavigate("wishlist")}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition relative"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none scale-90">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button 
              id="btn-cart-view"
              onClick={() => onNavigate("cart")}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition relative"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none scale-90">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            <button 
              id="btn-user-avatar"
              onClick={() => onNavigate("profile")}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              {user?.isAuthenticated && (
                <span className="hidden lg:inline text-xs font-medium max-w-[80px] truncate">
                  {user.fullName.split(" ")[0]}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              id="btn-mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-dropdown" className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 px-4 pt-2 pb-4 space-y-3">
          {/* Mobile Search */}
          <div className="relative w-full my-2">
            <input
              type="text"
              placeholder="მოძებნე აბსურდული ნივთი..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full border border-transparent focus:outline-none"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-col gap-2 font-medium">
            <button 
              onClick={() => { onNavigate("home"); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm transition ${
                currentPage === "home" ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              მთავარი
            </button>
            <button 
              onClick={() => { onNavigate("catalog"); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm transition ${
                currentPage === "catalog" ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              კატალოგი
            </button>
            <button 
              onClick={() => { onNavigate("compare"); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm transition flex justify-between items-center ${
                currentPage === "compare" ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              <span className="flex items-center gap-2"><ArrowLeftRight className="w-4 h-4" /> შედარება</span>
              {compareList.length > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {compareList.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => { onNavigate("admin"); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm transition flex items-center gap-2 ${
                currentPage === "admin" ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white" : "text-zinc-500 hover:text-black dark:hover:text-zinc-200"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              ადმინისტრატორი
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
