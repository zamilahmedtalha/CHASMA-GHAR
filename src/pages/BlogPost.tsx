import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();

  // Mock data for the article
  const article = {
    title: 'How to Choose Sunglasses for Your Face Shape',
    category: 'Styling',
    author: 'Zainab A.',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p>Finding the perfect pair of sunglasses is about more than just following the latest trends. It's about discovering frames that complement your natural features, balance your proportions, and express your personal style. At Chasma Ghar, we believe that understanding your face shape is the first step to eyewear perfection.</p>
      
      <h3>1. The Round Face</h3>
      <p>If you have a round face, your goal is to add contrast and angles. Look for frames that are wider than they are tall. Rectangular, square, and geometric shapes work beautifully to elongate your face and provide a sharper, more defined look. Avoid circular frames, which will only emphasize the roundness.</p>
      
      <div class="callout">
        <strong>Pro Tip:</strong> The Architect collection features sharp, angular lines that are perfect for adding definition to softer facial features.
      </div>

      <h3>2. The Square Face</h3>
      <p>Square faces feature a strong jawline and a broad forehead. To soften these angular features, opt for curved frames. Round, oval, and slightly curved cat-eye styles are your best friends. These shapes will contrast with your natural angles and bring a harmonious balance to your overall look.</p>

      <h3>3. The Oval Face</h3>
      <p>Considered the most versatile face shape, oval faces have balanced proportions and can pull off almost any frame style. From oversized aviators to bold geometric shapes, feel free to experiment. The only rule of thumb is to choose frames that are as wide as, or slightly wider than, the broadest part of your face.</p>

      <h3>4. The Heart Face</h3>
      <p>Heart-shaped faces are wider at the forehead and gently narrow down to the chin. To balance this, look for frames that are wider at the bottom or have light-colored, rimless, or semi-rimless designs. Aviators and modified wayfarers are excellent choices that draw attention downward and balance your proportions.</p>

      <p>Remember, these are just guidelines. The most important factor in choosing sunglasses is how they make you feel. Confidence is the ultimate accessory. Visit our Virtual Try-On feature to experiment with different styles from the comfort of your home, or drop by our Karachi showroom for a personalized styling session.</p>
    `
  };

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-warm-white/60 hover:text-cyan-neon transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12 text-center">
            <span className="inline-block px-3 py-1 bg-white/5 text-warm-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 mb-6">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-warm-white/60">
              <div className="flex items-center gap-2"><User size={16} /> {article.author}</div>
              <div className="flex items-center gap-2"><Calendar size={16} /> {article.date}</div>
              <div className="flex items-center gap-2">{article.readTime}</div>
            </div>
          </header>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-white/10"
          >
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover mix-blend-luminosity opacity-90"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Article Content */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-invert prose-lg max-w-none font-sans leading-relaxed text-warm-white/80
                prose-headings:font-display prose-headings:font-bold prose-headings:text-warm-white prose-headings:mt-12 prose-headings:mb-6
                prose-p:mb-6
                prose-strong:text-warm-white
                prose-a:text-cyan-neon hover:prose-a:text-magenta-neon
                [&_.callout]:bg-white/5 [&_.callout]:border-l-4 [&_.callout]:border-cyan-neon [&_.callout]:p-6 [&_.callout]:rounded-r-xl [&_.callout]:my-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share & Tags */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-display font-semibold uppercase tracking-wider text-warm-white/60">Tags:</span>
                <span className="text-sm px-3 py-1 bg-white/5 rounded-full text-warm-white/80">Face Shapes</span>
                <span className="text-sm px-3 py-1 bg-white/5 rounded-full text-warm-white/80">Style Guide</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-display font-semibold uppercase tracking-wider text-warm-white/60 flex items-center gap-2">
                  <Share2 size={16} /> Share:
                </span>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Linkedin size={18} />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Products / CTA */}
        <section className="mt-24 max-w-4xl mx-auto bg-charcoal rounded-3xl p-8 md:p-12 text-center border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-magenta-neon/5 opacity-50" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Find Your Perfect Match</h3>
            <p className="text-warm-white/70 mb-8 max-w-xl mx-auto">
              Ready to apply what you've learned? Explore our curated collections and use our Virtual Try-On to see how different shapes look on you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop" className="px-8 py-4 bg-warm-white text-off-black font-semibold rounded-full hover:bg-cyan-neon transition-colors w-full sm:w-auto">
                Shop All Frames
              </Link>
              <Link to="/virtual-try-on" className="px-8 py-4 border border-white/20 text-warm-white font-semibold rounded-full hover:border-cyan-neon hover:text-cyan-neon transition-colors w-full sm:w-auto">
                Try On Virtually
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
