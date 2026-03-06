import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, X, CheckCircle2, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VirtualTryOn() {
  const [step, setStep] = useState<'intro' | 'camera' | 'result'>('intro');
  const [selectedFrame, setSelectedFrame] = useState(1);

  const frames = [
    { id: 1, name: 'The Architect', color: 'Charcoal Black', image: '/glasses-1.png' },
    { id: 2, name: 'Neon Nights', color: 'Cyan', image: '/glasses-2.png' },
    { id: 3, name: 'Classic Round', color: 'Tortoise Shell', image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=400&auto=format&fit=crop' },
  ];

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Virtual <span className="text-gradient">Try-On</span>
          </h1>
          <p className="text-warm-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Experience our luxury frames from the comfort of your home. Use your camera or upload a photo to see how different styles fit your face shape.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glassmorphism-dark rounded-3xl border border-white/10 overflow-hidden relative min-h-[600px] flex flex-col">
            
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/5 to-magenta-neon/5 opacity-50 pointer-events-none" />

            <AnimatePresence mode="wait">
              {step === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                    <Camera size={40} className="text-cyan-neon" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">See Yourself in Chasma Ghar</h2>
                  <p className="text-warm-white/60 mb-12 max-w-md">
                    We need access to your camera to overlay frames on your face in real-time. Your privacy is protected; no images are saved.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                    <button 
                      onClick={() => setStep('camera')}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-cyan-neon text-off-black font-semibold rounded-full hover:bg-warm-white transition-colors"
                    >
                      <Camera size={20} /> Enable Camera
                    </button>
                    <button 
                      onClick={() => setStep('camera')}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-warm-white font-semibold rounded-full hover:border-cyan-neon hover:text-cyan-neon transition-colors"
                    >
                      <Upload size={20} /> Upload Photo
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'camera' && (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col relative"
                >
                  {/* Simulated Camera Feed */}
                  <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
                    <p className="text-warm-white/40 flex items-center gap-2">
                      <Camera className="animate-pulse" /> Camera active...
                    </p>
                    {/* Simulated Face Outline */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="w-64 h-80 border-2 border-dashed border-cyan-neon rounded-[100px]" />
                    </div>
                  </div>

                  {/* Top Controls */}
                  <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 bg-gradient-to-b from-off-black/80 to-transparent">
                    <button 
                      onClick={() => setStep('intro')}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <div className="flex items-center gap-2 bg-off-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <CheckCircle2 size={16} className="text-cyan-neon" />
                      <span className="text-sm font-medium">Face Detected</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <SlidersHorizontal size={20} />
                    </button>
                  </div>

                  {/* Bottom Frame Selection */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-10 bg-gradient-to-t from-off-black/90 via-off-black/60 to-transparent">
                    <div className="flex items-center gap-4 overflow-x-auto pb-4 hide-scrollbar">
                      {frames.map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setSelectedFrame(frame.id)}
                          className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                            selectedFrame === frame.id ? 'border-cyan-neon scale-110 shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <img src={frame.image} alt={frame.name} className="w-full h-full object-cover mix-blend-luminosity" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <h3 className="text-xl font-display font-bold">{frames.find(f => f.id === selectedFrame)?.name}</h3>
                        <p className="text-sm text-warm-white/60">{frames.find(f => f.id === selectedFrame)?.color}</p>
                      </div>
                      <Link 
                        to={`/product/${selectedFrame}`}
                        className="flex items-center gap-2 px-6 py-3 bg-cyan-neon text-off-black font-semibold rounded-full hover:bg-warm-white transition-colors"
                      >
                        View Details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
