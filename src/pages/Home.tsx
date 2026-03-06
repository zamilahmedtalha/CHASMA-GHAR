import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Sun, Monitor, Star } from 'lucide-react';
import ModelViewer from '../components/ModelViewer';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);

  return (
    <div className="bg-transparent min-h-screen text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center pt-20 pb-10 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 5.2 }}
              className="w-full lg:w-1/2 flex flex-col items-start text-left"
            >
              <h1 className="text-5xl sm:text-7xl xl:text-[5.5rem] font-bold tracking-tighter leading-[0.95] mb-6">
                The Creator-First <br/>
                <span className="text-[#6E60EE]">Generative AI</span> Platform
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-[30ch] mb-10 leading-relaxed">
                Generate high-quality visuals from simple prompts or custom models, tailored to your aesthetic and built to scale.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/shop" className="btn-primary">
                  Start now
                </Link>
                <Link to="/api" className="btn-secondary">
                  Developer API
                </Link>
              </div>
            </motion.div>

            {/* Right Content - 3D Model (Hidden on Mobile) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 5.4 }}
              className="hidden lg:block w-full lg:w-1/2 aspect-square relative"
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden glass-panel p-2 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                 <iframe 
                    title="Dangeresque, Too?" 
                    frameBorder="0" 
                    allowFullScreen 
                    allow="autoplay; fullscreen; xr-spatial-tracking" 
                    src="https://sketchfab.com/models/818dad81a1d647e6ab791edd0d3ccb68/embed?autostart=1&transparent=1&ui_infos=0&ui_watermark=0&ui_controls=0"
                    className="w-full h-full rounded-2xl bg-black/50"
                  ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid for 3D Models */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl tracking-tighter font-bold mb-4">Curated Models.</h2>
            <p className="text-zinc-400 text-lg max-w-xl">Experience our collection in full interactive 3D, powered by WebGL.</p>
          </div>
          <Link to="/shop" className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-2 group">
            View All Collections <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 aspect-square md:aspect-video rounded-3xl overflow-hidden glass-panel p-2"
          >
            <ModelViewer 
              title="Dangeresque, Too?"
              embedUrl="https://sketchfab.com/models/818dad81a1d647e6ab791edd0d3ccb68/embed"
              imageUrl="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-square rounded-3xl overflow-hidden glass-panel p-2"
          >
            <ModelViewer 
              title="Ray-Ban Meta"
              embedUrl="https://sketchfab.com/models/4da6290830774000bdab675a5663d666/embed"
              imageUrl="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-square rounded-3xl overflow-hidden glass-panel p-2"
          >
            <ModelViewer 
              title="Black Ray Bans"
              embedUrl="https://sketchfab.com/models/22c4c7f62e464e38a1ca6de104f60837/embed"
              imageUrl="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000&auto=format&fit=crop"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 aspect-square md:aspect-video rounded-3xl overflow-hidden glass-panel p-2"
          >
            <ModelViewer 
              title="Oakley Metaquest VR"
              embedUrl="https://sketchfab.com/models/78c8a95cef1f468d81e86fc561e52b97/embed"
              imageUrl="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1000&auto=format&fit=crop"
            />
          </motion.div>
        </div>
      </section>

      {/* Technology & Protection */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Advanced Lens Technology.
              </h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                Our lenses are engineered for the digital age. We combine traditional optical precision with modern protective coatings to ensure your eyes remain healthy, comfortable, and focused.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Monitor, title: 'Blue Light Filtering', desc: 'Reduces digital eye strain and improves sleep quality by blocking harmful blue light emitted by screens.' },
                  { icon: Sun, title: 'UV400 Protection', desc: '100% protection against UVA and UVB rays, preventing long-term damage to your eyes.' },
                  { icon: Shield, title: 'Anti-Reflective Coating', desc: 'Minimizes glare from screens and headlights, providing clearer vision and reducing fatigue.' },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-white">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
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
              className="relative aspect-square rounded-3xl glass-panel p-2 flex items-center justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1556306535-0f09a536f01f?q=80&w=1000&auto=format&fit=crop"
                alt="Lens Technology"
                className="w-full h-full object-cover rounded-2xl grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16">
            Loved by Visionaries.
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
                className="glass-panel p-8 rounded-2xl text-left"
              >
                <div className="flex items-center gap-1 text-white mb-6">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-zinc-300 text-base leading-relaxed mb-8">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">{review.name}</h5>
                    <p className="text-xs text-zinc-500">{review.role}</p>
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
