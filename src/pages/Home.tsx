import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Sun, Monitor, Star } from 'lucide-react';
import ModelViewer from '../components/ModelViewer';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven animations for the hero glasses
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  return (
    <div className="text-warm-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-white/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-magenta-neon animate-pulse" />
                <span className="text-sm font-medium tracking-wider uppercase font-display">Next-Gen Eyewear</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-6">
                Elevate Your Vision with <span className="text-gradient">Chasma Ghar</span>
              </h1>
              <p className="text-lg md:text-xl text-warm-white/80 font-sans mb-10 leading-relaxed">
                Premium eyewear that blends style, comfort, and protection. Discover luxury frames designed for the modern individual.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Link
                  to="/shop"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black dynamic-bg rounded-full overflow-hidden transition-all hover:scale-105 hover:opacity-90"
                >
                  <span className="relative z-10 flex items-center gap-2 font-display">
                    Explore Frames <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/virtual-try-on"
                  className="group inline-flex items-center justify-center px-8 py-4 font-medium btn-alpha"
                >
                  Virtual Try-On
                </Link>
              </div>
            </motion.div>

            {/* Scroll-driven Hero 3D Model */}
            <motion.div
              style={{ y, rotate, scale, opacity }}
              className="relative w-full aspect-square lg:aspect-[4/3] glassmorphism rounded-3xl overflow-hidden p-2"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black/40">
                <iframe 
                  title="Dangeresque, Too?" 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; fullscreen; xr-spatial-tracking" 
                  src="https://sketchfab.com/models/818dad81a1d647e6ab791edd0d3ccb68/embed?autostart=1&transparent=1&ui_infos=0&ui_watermark=0&ui_controls=1"
                  className="w-full h-full"
                ></iframe>
              </div>
              {/* Glassmorphism overlay for depth */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured 3D Models Showcase */}
      <section className="py-32 bg-charcoal relative z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">Signature Collections</h2>
              <p className="text-warm-white/60 font-sans max-w-md text-lg">
                Curated styles for every occasion. Experience our premium frames in full 3D.
              </p>
            </div>
            <Link to="/shop" className="text-magenta-neon hover:text-cyan-neon transition-colors font-medium flex items-center gap-2 group font-display">
              View All Collections <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModelViewer 
              title="Ray-Ban Meta Smart Glasses"
              embedUrl="https://sketchfab.com/models/4da6290830774000bdab675a5663d666/embed"
              imageUrl="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"
            />
            <ModelViewer 
              title="Black Ray Bans"
              embedUrl="https://sketchfab.com/models/22c4c7f62e464e38a1ca6de104f60837/embed"
              imageUrl="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop"
            />
            <ModelViewer 
              title="Oakley Metaquest VR"
              embedUrl="https://sketchfab.com/models/78c8a95cef1f468d81e86fc561e52b97/embed"
              imageUrl="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Technology & Protection */}
      <section className="py-32 bg-graphite relative overflow-hidden">
        <div className="absolute -right-1/4 top-1/2 -translate-y-1/2 w-1/2 aspect-square rounded-full bg-cyan-neon/5 blur-[120px] pointer-events-none" />
        <div className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-1/2 aspect-square rounded-full bg-magenta-neon/5 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
                Advanced Lens <span className="text-gradient">Technology</span>
              </h2>
              <p className="text-warm-white/70 font-sans text-lg mb-10 leading-relaxed">
                Our lenses are engineered for the digital age. We combine traditional optical precision with modern protective coatings to ensure your eyes remain healthy, comfortable, and focused.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Monitor, title: 'Blue Light Filtering', desc: 'Reduces digital eye strain and improves sleep quality by blocking harmful blue light emitted by screens.' },
                  { icon: Sun, title: 'UV400 Protection', desc: '100% protection against UVA and UVB rays, preventing long-term damage to your eyes.' },
                  { icon: Shield, title: 'Anti-Reflective Coating', desc: 'Minimizes glare from screens and headlights, providing clearer vision and reducing fatigue.' },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl glassmorphism flex items-center justify-center text-cyan-neon">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-semibold mb-2">{feature.title}</h4>
                      <p className="text-warm-white/60 font-sans text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl glassmorphism-dark p-8 flex items-center justify-center border border-white/5"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-neon/10 to-magenta-neon/10 opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1556306535-0f09a536f01f?q=80&w=1000&auto=format&fit=crop"
                alt="Lens Technology"
                className="w-full h-full object-cover rounded-2xl mix-blend-luminosity opacity-80"
                referrerPolicy="no-referrer"
              />
              {/* Decorative animated rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-cyan-neon/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-magenta-neon/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-off-black relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-16">
            Loved by <span className="text-gradient">Visionaries</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Zainab A.', role: 'Software Engineer', text: 'The blue light glasses completely cured my end-of-day headaches. Plus, they look incredibly stylish on Zoom calls.', rating: 5 },
              { name: 'Omar F.', role: 'Creative Director', text: 'The build quality is phenomenal. You can feel the luxury in the hinges and the clarity of the lenses is unmatched.', rating: 5 },
              { name: 'Fatima S.', role: 'University Student', text: 'I love the Virtual Try-On feature! It helped me pick the perfect frame for my face shape. Fast shipping too.', rating: 5 },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glassmorphism-dark p-8 rounded-2xl text-left border border-white/5 hover:border-cyan-neon/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-1 text-cyan-neon mb-6">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-warm-white/80 font-sans text-base leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-neon to-pastel-purple flex items-center justify-center text-off-black font-bold font-display">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-display font-semibold text-warm-white">{review.name}</h5>
                    <p className="text-xs text-warm-white/50 font-sans">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
