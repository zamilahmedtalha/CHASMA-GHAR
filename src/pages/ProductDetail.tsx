import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronDown, ChevronUp, ShieldCheck, Truck, RefreshCw, Heart, Share2 } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('#1A1A1A');
  const [lensStep, setLensStep] = useState(0); // 0: Frame only, 1: Lens Type, 2: Prescription

  // Mock product data
  const product = {
    id: id || '1',
    name: 'The Architect',
    tagline: 'Precision engineered for the modern professional.',
    price: 'Rs. 8,500',
    rating: 4.8,
    reviews: 124,
    images: [
      '/glasses-1.png',
      '/glasses-2.png'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1A1A1A' },
      { name: 'Tortoise Shell', hex: '#8B4513' },
      { name: 'Clear Crystal', hex: '#E0E0E0' }
    ],
    description: 'The Architect blends mid-century modern aesthetics with cutting-edge lightweight materials. Designed for all-day comfort, these frames feature adjustable nose pads and flexible titanium hinges.',
    materials: 'Hand-polished Italian acetate front with beta-titanium temples. Hypoallergenic and incredibly durable.',
    fit: 'Medium to Large fit. Ideal for round, oval, and heart-shaped faces.'
  };

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-warm-white/50 mb-8">
          <Link to="/" className="hover:text-cyan-neon transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-cyan-neon transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-warm-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Product Images (Simulated Scroll Sequence) */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="sticky top-32 aspect-square rounded-3xl glassmorphism-dark overflow-hidden border border-white/5 flex items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-magenta-neon/5 opacity-50" />
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Thumbnails */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                {product.images.map((img, i) => (
                  <button key={i} className="w-16 h-16 rounded-xl border border-white/20 overflow-hidden hover:border-cyan-neon transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Details & Configurator */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">{product.name}</h1>
                <div className="flex gap-3">
                  <button className="text-warm-white/50 hover:text-magenta-neon transition-colors"><Heart size={24} /></button>
                  <button className="text-warm-white/50 hover:text-cyan-neon transition-colors"><Share2 size={24} /></button>
                </div>
              </div>
              
              <p className="text-lg text-warm-white/70 font-sans mb-6">{product.tagline}</p>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-mono font-medium">{product.price}</span>
                <div className="flex items-center gap-1 text-cyan-neon text-sm">
                  <Star size={16} fill="currentColor" />
                  <span className="text-warm-white/80 ml-1">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-10">
                <h3 className="text-sm font-display font-semibold uppercase tracking-wider mb-4">
                  Color: <span className="text-warm-white/60 font-normal">{product.colors.find(c => c.hex === selectedColor)?.name}</span>
                </h3>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.hex ? 'border-cyan-neon scale-110 shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'border-white/20 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Select ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Lens Configurator Flow */}
              <div className="glassmorphism rounded-2xl p-6 mb-10 border border-white/10">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-lg font-display font-semibold">Pair with Lenses</h3>
                  <div className="flex gap-2">
                    {[0, 1, 2].map(step => (
                      <div key={step} className={`w-2 h-2 rounded-full ${lensStep >= step ? 'bg-cyan-neon shadow-[0_0_8px_rgba(0,255,255,0.5)]' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {lensStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <button onClick={() => setLensStep(1)} className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-cyan-neon hover:bg-white/5 transition-all group">
                        <div className="text-left">
                          <h4 className="font-semibold text-warm-white group-hover:text-cyan-neon transition-colors">Prescription Lenses</h4>
                          <p className="text-sm text-warm-white/60">Single vision, progressive, or reading.</p>
                        </div>
                        <span className="text-sm font-mono text-warm-white/50">From Rs. 3,000</span>
                      </button>
                      <button onClick={() => setLensStep(1)} className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-magenta-neon hover:bg-white/5 transition-all group">
                        <div className="text-left">
                          <h4 className="font-semibold text-warm-white group-hover:text-magenta-neon transition-colors">Non-Prescription</h4>
                          <p className="text-sm text-warm-white/60">Blue light blocking or fashion clear lenses.</p>
                        </div>
                        <span className="text-sm font-mono text-warm-white/50">From Rs. 1,500</span>
                      </button>
                      <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-pastel-purple hover:bg-white/5 transition-all group">
                        <div className="text-left">
                          <h4 className="font-semibold text-warm-white group-hover:text-pastel-purple transition-colors">Frame Only</h4>
                          <p className="text-sm text-warm-white/60">Buy the frame without any lenses.</p>
                        </div>
                        <span className="text-sm font-mono text-warm-white/50">+ Rs. 0</span>
                      </button>
                    </motion.div>
                  )}

                  {lensStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-warm-white/70 mb-4">Select your lens technology:</p>
                      <button onClick={() => setLensStep(2)} className="w-full flex items-center justify-between p-4 rounded-xl border border-cyan-neon bg-cyan-neon/5 transition-all">
                        <div className="text-left">
                          <h4 className="font-semibold text-cyan-neon">Blue Light Filter</h4>
                          <p className="text-sm text-warm-white/60">Reduces digital eye strain.</p>
                        </div>
                        <span className="text-sm font-mono">+ Rs. 2,000</span>
                      </button>
                      <button onClick={() => setLensStep(2)} className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all">
                        <div className="text-left">
                          <h4 className="font-semibold text-warm-white">Standard Clear</h4>
                          <p className="text-sm text-warm-white/60">Anti-reflective coating included.</p>
                        </div>
                        <span className="text-sm font-mono">+ Rs. 1,000</span>
                      </button>
                      <button onClick={() => setLensStep(0)} className="text-sm text-warm-white/50 hover:text-warm-white underline mt-4">Back</button>
                    </motion.div>
                  )}

                  {lensStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <p className="text-sm text-warm-white/70">Upload your prescription or enter it manually later.</p>
                      <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-cyan-neon hover:bg-white/5 transition-colors cursor-pointer">
                        <p className="text-sm font-medium mb-2">Click to upload prescription</p>
                        <p className="text-xs text-warm-white/50">PDF, JPG, or PNG</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <button onClick={() => setLensStep(1)} className="text-sm text-warm-white/50 hover:text-warm-white underline">Back</button>
                        <button className="px-6 py-3 bg-cyan-neon text-off-black font-semibold rounded-full hover:bg-warm-white transition-colors">
                          Add to Cart - Rs. 10,500
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mb-12 border-y border-white/10 py-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck size={24} className="text-cyan-neon" />
                  <span className="text-xs text-warm-white/70">1 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 border-x border-white/10">
                  <Truck size={24} className="text-magenta-neon" />
                  <span className="text-xs text-warm-white/70">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RefreshCw size={24} className="text-pastel-purple" />
                  <span className="text-xs text-warm-white/70">14-Day Returns</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="space-y-4">
                {[
                  { id: 'description', title: 'Description', content: product.description },
                  { id: 'materials', title: 'Materials & Craftsmanship', content: product.materials },
                  { id: 'fit', title: 'Fit & Measurements', content: product.fit },
                ].map((tab) => (
                  <div key={tab.id} className="border-b border-white/10 pb-4">
                    <button 
                      onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                      className="w-full flex justify-between items-center py-2 text-lg font-display font-medium hover:text-cyan-neon transition-colors"
                    >
                      {tab.title}
                      {activeTab === tab.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <AnimatePresence>
                      {activeTab === tab.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-warm-white/70 font-sans text-sm leading-relaxed pt-4 pb-2">
                            {tab.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </div>
        
        {/* Style Story / SEO Content */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">The <span className="text-gradient">Architect</span> Story</h2>
            <p className="text-warm-white/70 text-lg leading-relaxed mb-8">
              Designed for the visionary, The Architect is more than just a pair of glasses. It's a statement of intent. Whether you're presenting in the boardroom or coding late into the night, these luxury prescription frames offer unparalleled comfort and clarity. Buy The Architect glasses online in Pakistan and experience the Chasma Ghar difference.
            </p>
            <Link to="/blog/styling-the-architect" className="inline-flex items-center gap-2 text-cyan-neon hover:text-magenta-neon transition-colors font-medium">
              Read the Style Guide <Share2 size={16} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
