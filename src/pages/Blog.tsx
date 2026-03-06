import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

// Mock Blog Data
const posts = [
  { id: 1, title: 'How to Choose Sunglasses for Your Face Shape', excerpt: 'A comprehensive guide to finding the perfect frames that complement your natural features.', category: 'Styling', author: 'Zainab A.', date: 'Oct 12, 2024', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop', featured: true },
  { id: 2, title: 'The Science Behind Blue Light Glasses', excerpt: 'Why gamers and office workers are turning to advanced lens technology to reduce digital eye strain.', category: 'Eye Health', author: 'Dr. Omar F.', date: 'Nov 05, 2024', image: 'https://images.unsplash.com/photo-1556306535-0f09a536f01f?q=80&w=800&auto=format&fit=crop', featured: false },
  { id: 3, title: 'Top Eyewear Trends for Winter 2024', excerpt: 'From bold acetates to minimalist metals, discover what\'s trending this season in luxury eyewear.', category: 'Trends', author: 'Fatima S.', date: 'Nov 20, 2024', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop', featured: false },
  { id: 4, title: 'Kids Eyewear: What Parents Need to Know', excerpt: 'Ensuring your child\'s vision is protected with durable, comfortable, and stylish frames.', category: 'Kids', author: 'Zainab A.', date: 'Dec 02, 2024', image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop', featured: false },
  { id: 5, title: 'Eye Care in Karachi: Navigating Urban Pollution', excerpt: 'Local insights on protecting your eyes from dust, smog, and intense sunlight in Pakistan\'s largest city.', category: 'Local Stories', author: 'Dr. Omar F.', date: 'Dec 15, 2024', image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop', featured: false },
  { id: 6, title: 'Understanding Lens Coatings: Anti-Reflective vs. Scratch Resistant', excerpt: 'A deep dive into the technology that makes Chasma Ghar lenses superior.', category: 'Technology', author: 'Ali R.', date: 'Jan 10, 2025', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop', featured: false },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Styling', 'Eye Health', 'Trends', 'Kids', 'Local Stories', 'Technology'];

  const filteredPosts = activeCategory === 'All' 
    ? posts.filter(p => !p.featured) 
    : posts.filter(p => p.category === activeCategory && !p.featured);

  const featuredPost = posts.find(p => p.featured);

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              The <span className="text-gradient">Vision</span> Journal
            </h1>
            <p className="text-warm-white/70 text-lg leading-relaxed">
              Insights on eyewear fashion, eye health, styling tips, and the latest from Chasma Ghar.
            </p>
          </div>
          
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full md:w-80 bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-cyan-neon transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white/40" size={20} />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-12 hide-scrollbar border-b border-white/10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-5 py-2 rounded-full transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-cyan-neon text-off-black' 
                  : 'text-warm-white/60 hover:text-warm-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {activeCategory === 'All' && featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <Link to={`/blog/${featuredPost.id}`} className="group relative block rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-off-black via-off-black/60 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end">
                <span className="inline-block px-3 py-1 bg-cyan-neon text-off-black text-xs font-bold uppercase tracking-wider rounded-full mb-4 w-max">
                  Featured
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-warm-white mb-4 group-hover:text-cyan-neon transition-colors max-w-3xl">
                  {featuredPost.title}
                </h2>
                <p className="text-warm-white/70 text-lg mb-6 max-w-2xl line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-warm-white/50">
                  <div className="flex items-center gap-2"><User size={16} /> {featuredPost.author}</div>
                  <div className="flex items-center gap-2"><Calendar size={16} /> {featuredPost.date}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <Link to={`/blog/${post.id}`} className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 block">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-off-black/80 backdrop-blur-md text-warm-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/10">
                  {post.category}
                </div>
              </Link>
              
              <div className="flex flex-col flex-1">
                <Link to={`/blog/${post.id}`} className="text-2xl font-display font-bold mb-3 hover:text-magenta-neon transition-colors line-clamp-2">
                  {post.title}
                </Link>
                <p className="text-warm-white/60 font-sans text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs text-warm-white/50">
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="text-cyan-neon hover:text-warm-white transition-colors">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup (Blog specific) */}
        <section className="bg-charcoal rounded-3xl p-8 md:p-16 text-center relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 via-transparent to-magenta-neon/5 opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Join the <span className="text-gradient">Chasma Ghar</span> Circle</h2>
            <p className="text-warm-white/70 text-lg mb-8">
              Subscribe to our newsletter for exclusive style tips, eye health advice, and early access to new collections.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full sm:w-96 bg-off-black border border-white/20 rounded-full px-6 py-4 text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-cyan-neon transition-colors"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-warm-white text-off-black font-semibold rounded-full hover:bg-cyan-neon transition-colors whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
