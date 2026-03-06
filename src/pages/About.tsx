import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Eye, Heart, Shield, Users } from 'lucide-react';

export default function About() {
  const milestones = [
    { year: '2019', title: 'The Vision Begins', desc: 'Founded in Karachi with a mission to democratize luxury eyewear.' },
    { year: '2020', title: 'Digital Try-On Launch', desc: 'Introduced our proprietary AR try-on technology to Pakistan.' },
    { year: '2022', title: 'Blue Light Revolution', desc: 'Launched our signature gaming and office collections.' },
    { year: '2024', title: 'Community Clinics', desc: 'Partnered with local optometrists for free eye camps.' },
  ];

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-cyan-neon/10 via-off-black to-off-black opacity-50" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
            The <span className="text-gradient">Chasma Ghar</span> Story
          </h1>
          <p className="text-xl md:text-2xl text-warm-white/80 leading-relaxed font-sans">
            A visionary eyewear house based in Pakistan, blending traditional craftsmanship with cutting-edge lens technology and modern fashion.
          </p>
        </motion.div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-charcoal relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-warm-white/70 leading-relaxed mb-8">
                We believe that high-quality, stylish glasses should be accessible without compromising on luxury standards. Chasma Ghar was born out of a desire to create a premium eyewear brand that cares deeply about both fashion and eye health.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: Eye, title: 'Vision First', desc: 'Uncompromising lens quality.' },
                  { icon: Heart, title: 'Craftsmanship', desc: 'Hand-polished, durable frames.' },
                  { icon: Shield, title: 'Protection', desc: 'Advanced blue light & UV filters.' },
                  { icon: Users, title: 'Community', desc: 'Supporting local eye health.' },
                ].map((val, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-xl glassmorphism flex items-center justify-center text-magenta-neon">
                      <val.icon size={24} />
                    </div>
                    <h4 className="font-display font-semibold text-lg">{val.title}</h4>
                    <p className="text-sm text-warm-white/60">{val.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1556306535-0f09a536f01f?q=80&w=1000&auto=format&fit=crop" 
                alt="Chasma Ghar Craftsmanship"
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-off-black via-transparent to-transparent opacity-90" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-off-black relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-20">Our <span className="text-gradient">Journey</span></h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-neon via-pastel-purple to-magenta-neon opacity-30 hidden md:block" />
            
            <div className="space-y-16">
              {milestones.map((milestone, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 text-center md:text-${i % 2 === 0 ? 'left' : 'right'}`}>
                    <h3 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon to-pastel-purple mb-2">
                      {milestone.year}
                    </h3>
                    <h4 className="text-xl font-semibold text-warm-white mb-3">{milestone.title}</h4>
                    <p className="text-warm-white/60 font-sans leading-relaxed">{milestone.desc}</p>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-4 h-4 rounded-full bg-cyan-neon shadow-[0_0_15px_rgba(0,255,255,0.5)] z-10 hidden md:block relative">
                    <div className="absolute inset-0 rounded-full bg-cyan-neon animate-ping opacity-50" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content & CTA */}
      <section className="py-24 bg-graphite text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-6">Experience the Premium Glasses Brand Story</h2>
          <p className="text-warm-white/70 text-lg leading-relaxed mb-10">
            From our design studio in Karachi to your doorstep anywhere in Pakistan, Chasma Ghar is dedicated to providing luxury eyewear that elevates your everyday look. Explore our collections and find the perfect frame for your face shape.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center justify-center px-8 py-4 font-medium text-off-black bg-warm-white rounded-full hover:bg-cyan-neon hover:scale-105 transition-all duration-300"
          >
            Explore Collections
          </Link>
        </div>
      </section>

    </div>
  );
}
