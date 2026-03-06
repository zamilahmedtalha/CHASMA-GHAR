import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/shop?collection=all' },
    { name: 'AI Designer', path: '/ai-designer' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-off-black/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter z-50 relative group">
          <span className="text-warm-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-neon group-hover:to-magenta-neon transition-all duration-300">
            CHASMA GHAR
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-warm-white/80 hover:text-warm-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-neon to-magenta-neon transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-warm-white/80 hover:text-cyan-neon transition-colors">
            <Search size={20} />
          </button>
          <Link to="/account" className="text-warm-white/80 hover:text-magenta-neon transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="text-warm-white/80 hover:text-pastel-purple transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-cyan-neon text-off-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-warm-white z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-off-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-medium text-warm-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-neon hover:to-magenta-neon transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-8 mt-12">
              <button className="text-warm-white hover:text-cyan-neon transition-colors">
                <Search size={28} />
              </button>
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-warm-white hover:text-magenta-neon transition-colors">
                <User size={28} />
              </Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-warm-white hover:text-pastel-purple transition-colors relative">
                <ShoppingBag size={28} />
                <span className="absolute -top-2 -right-2 bg-cyan-neon text-off-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
