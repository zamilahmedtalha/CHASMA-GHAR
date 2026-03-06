import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data
const products = [
  { id: 1, name: 'The Architect', price: 'Rs. 8,500', category: 'Blue Light', image: '/glasses-1.png', colors: ['#1A1A1A', '#8B4513'] },
  { id: 2, name: 'Neon Nights', price: 'Rs. 12,000', category: 'Sunglasses', image: '/glasses-2.png', colors: ['#00FFFF', '#FF00FF'] },
  { id: 3, name: 'Classic Round', price: 'Rs. 6,500', category: 'Prescription', image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop', colors: ['#000000', '#C0C0C0'] },
  { id: 4, name: 'The Executive', price: 'Rs. 9,500', category: 'Prescription', image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop', colors: ['#4A4A4A'] },
  { id: 5, name: 'Summer Breeze', price: 'Rs. 10,500', category: 'Sunglasses', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop', colors: ['#FFC0CB', '#FFFFFF'] },
  { id: 6, name: 'Gamer Pro', price: 'Rs. 7,800', category: 'Blue Light', image: 'https://images.unsplash.com/photo-1556306535-0f09a536f01f?q=80&w=800&auto=format&fit=crop', colors: ['#121212', '#00FFFF'] },
];

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Prescription', 'Sunglasses', 'Blue Light', 'Kids'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header & SEO Content */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Luxury <span className="text-gradient">Eyewear</span> Collection
          </h1>
          <p className="text-warm-white/70 text-lg leading-relaxed">
            Discover premium prescription frames, blue light blocking glasses, and luxury sunglasses online. Crafted for comfort, designed for style.
          </p>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-y border-white/10 py-4">
          <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm font-medium text-warm-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              <Filter size={16} /> Filters
            </button>
            
            <div className="h-6 w-px bg-white/20 mx-2 hidden md:block" />

            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-cyan-neon text-off-black' 
                    : 'text-warm-white/60 hover:text-warm-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-sm text-warm-white/60">Sort by:</span>
            <button className="flex items-center gap-1 text-sm font-medium text-warm-white hover:text-cyan-neon transition-colors">
              Featured <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar (Desktop) */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden"
              >
                <div className="w-[280px] pr-8 border-r border-white/10 h-full space-y-8">
                  <div>
                    <h3 className="text-sm font-display font-semibold uppercase tracking-wider mb-4">Frame Shape</h3>
                    <div className="space-y-3">
                      {['Round', 'Square', 'Rectangle', 'Cat Eye', 'Aviator'].map(shape => (
                        <label key={shape} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-4 h-4 rounded border border-white/30 group-hover:border-cyan-neon flex items-center justify-center transition-colors">
                            {/* Checkmark icon would go here when active */}
                          </div>
                          <span className="text-sm text-warm-white/70 group-hover:text-warm-white transition-colors">{shape}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-display font-semibold uppercase tracking-wider mb-4">Price Range</h3>
                    <input type="range" className="w-full accent-cyan-neon" min="5000" max="25000" />
                    <div className="flex justify-between text-xs text-warm-white/50 mt-2">
                      <span>Rs. 5,000</span>
                      <span>Rs. 25,000+</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col"
              >
                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 mb-4 block">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center gap-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-off-black/80 to-transparent">
                    <button className="w-10 h-10 rounded-full bg-warm-white text-off-black flex items-center justify-center hover:bg-cyan-neon transition-colors" title="Quick View">
                      <Eye size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-warm-white text-off-black flex items-center justify-center hover:bg-magenta-neon transition-colors" title="Add to Wishlist">
                      <Heart size={18} />
                    </button>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <Link to={`/product/${product.id}`} className="text-lg font-display font-semibold hover:text-cyan-neon transition-colors">
                      {product.name}
                    </Link>
                    <span className="text-sm font-mono text-warm-white/80">{product.price}</span>
                  </div>
                  <span className="text-xs text-warm-white/50 mb-3">{product.category}</span>
                  
                  {/* Color Swatches */}
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <div 
                        key={idx} 
                        className="w-4 h-4 rounded-full border border-white/20 cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
