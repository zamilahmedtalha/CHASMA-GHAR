import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle gradient band at the top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-neon via-pastel-purple to-magenta-neon opacity-50" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-warm-white">
            CHASMA GHAR
          </Link>
          <p className="text-sm text-warm-white/60 leading-relaxed font-sans">
            Elevating vision with premium, stylish eyewear. Blending traditional craftsmanship with cutting-edge lens technology for the modern individual.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="text-warm-white/60 hover:text-cyan-neon transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-warm-white/60 hover:text-magenta-neon transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-warm-white/60 hover:text-pastel-purple transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-warm-white/60 hover:text-cyan-neon transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-display font-semibold tracking-wider text-warm-white uppercase mb-2">Shop</h4>
          <Link to="/shop?category=sunglasses" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Sunglasses</Link>
          <Link to="/shop?category=prescription" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Prescription Glasses</Link>
          <Link to="/shop?category=blue-light" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Blue Light Blockers</Link>
          <Link to="/shop?category=kids" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Kids Eyewear</Link>
          <Link to="/shop?collection=limited" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Limited Editions</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-display font-semibold tracking-wider text-warm-white uppercase mb-2">Support</h4>
          <Link to="/help" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Help Center & FAQ</Link>
          <Link to="/shipping" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Shipping & Returns</Link>
          <Link to="/warranty" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Warranty Info</Link>
          <Link to="/contact" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Contact Us</Link>
          <Link to="/virtual-try-on" className="text-sm text-warm-white/60 hover:text-warm-white transition-colors">Virtual Try-On Guide</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-display font-semibold tracking-wider text-warm-white uppercase mb-2">Newsletter</h4>
          <p className="text-sm text-warm-white/60 leading-relaxed font-sans mb-2">
            Subscribe for style tips, eye health advice, and early access to new collections.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-off-black border border-white/10 rounded-md px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-cyan-neon transition-colors"
              required
            />
            <button
              type="submit"
              className="bg-warm-white text-off-black font-medium text-sm rounded-md px-4 py-3 hover:bg-cyan-neon transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-xs text-warm-white/40 font-sans">
          &copy; {new Date().getFullYear()} Chasma Ghar. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-xs text-warm-white/40 hover:text-warm-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-xs text-warm-white/40 hover:text-warm-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
