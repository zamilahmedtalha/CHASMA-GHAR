import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'AI Designer', path: '/ai-designer' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div className={`mx-auto w-full transition-all duration-500 ${isScrolled ? 'py-2 px-4' : 'py-6 px-6 xl:px-10'}`}>
          <div className={`relative flex w-full items-center justify-between rounded-2xl transition-all duration-500 ${isScrolled ? 'bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-2xl' : 'bg-transparent'}`}>
            {/* Logo */}
            <Link to="/" className="text-xl font-bold tracking-tighter text-white">
              CHASMA GHAR
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-6">
              <button className="text-white/80 hover:text-white transition-colors">
                <Search size={18} />
              </button>
              <Link to="/account" className="text-white/80 hover:text-white transition-colors">
                <User size={18} />
              </Link>
              <Link to="/cart" className="text-white/80 hover:text-white transition-colors relative">
                <ShoppingBag size={18} />
                <span className="absolute -top-1.5 -right-1.5 bg-[#6E60EE] text-white text-[10px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-medium tracking-tighter text-white hover:text-zinc-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-8 mt-12">
              <button className="text-white hover:text-zinc-400 transition-colors">
                <Search size={28} />
              </button>
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-zinc-400 transition-colors">
                <User size={28} />
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-zinc-400 transition-colors relative">
                <ShoppingBag size={28} />
                <span className="absolute -top-2 -right-2 bg-[#6E60EE] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
