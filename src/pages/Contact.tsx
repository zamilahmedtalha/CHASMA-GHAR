import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp, Send } from 'lucide-react';

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { question: 'How long does shipping take?', answer: 'Standard shipping within Pakistan takes 3-5 business days. Express shipping is available for major cities within 1-2 business days.' },
    { question: 'What is your return policy?', answer: 'We offer a 14-day hassle-free return policy for non-prescription frames. Prescription lenses are custom-made and non-refundable, but we will remake them if there is an error on our part.' },
    { question: 'How do I submit my prescription?', answer: 'You can upload a photo or PDF of your prescription during the checkout process, or email it to us at rx@chasmaghar.com with your order number.' },
    { question: 'Do you offer international shipping?', answer: 'Currently, we only ship within Pakistan. We are working on expanding our delivery network soon.' },
  ];

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-warm-white/70 text-lg leading-relaxed">
            Whether you have a question about your prescription, need styling advice, or want to track an order, our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glassmorphism-dark rounded-3xl p-8 md:p-12 border border-white/5"
          >
            <h2 className="text-2xl font-display font-bold mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-warm-white/70 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:outline-none focus:border-cyan-neon transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-warm-white/70 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:outline-none focus:border-magenta-neon transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-warm-white/70 mb-2">Subject</label>
                <select 
                  id="subject" 
                  className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white focus:outline-none focus:border-pastel-purple transition-colors appearance-none"
                >
                  <option value="order">Order Support</option>
                  <option value="prescription">Prescription Questions</option>
                  <option value="styling">Styling Advice</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-warm-white/70 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white placeholder:text-warm-white/30 focus:outline-none focus:border-cyan-neon transition-colors resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-warm-white text-off-black font-semibold rounded-xl px-6 py-4 hover:bg-cyan-neon transition-colors duration-300 group"
              >
                Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Mini FAQ */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glassmorphism p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-neon/10 text-cyan-neon flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">Showroom</h3>
                  <p className="text-sm text-warm-white/60 font-sans leading-relaxed">
                    123 Luxury Avenue, Phase 6<br />
                    DHA, Karachi, Pakistan
                  </p>
                </div>
              </div>
              
              <div className="glassmorphism p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-magenta-neon/10 text-magenta-neon flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">Hours</h3>
                  <p className="text-sm text-warm-white/60 font-sans leading-relaxed">
                    Mon - Sat: 10:00 AM - 8:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-pastel-purple/10 text-pastel-purple flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-sm text-warm-white/60 font-sans leading-relaxed">
                    +92 300 1234567<br />
                    (WhatsApp Available)
                  </p>
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-neon/10 text-cyan-neon flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">Email</h3>
                  <p className="text-sm text-warm-white/60 font-sans leading-relaxed">
                    support@chasmaghar.com<br />
                    rx@chasmaghar.com
                  </p>
                </div>
              </div>
            </div>

            {/* Mini FAQ */}
            <div className="bg-charcoal rounded-3xl p-8 border border-white/5">
              <h2 className="text-2xl font-display font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex justify-between items-center py-2 text-left font-display font-medium hover:text-cyan-neon transition-colors"
                    >
                      {faq.question}
                      {activeFaq === i ? <ChevronUp size={20} className="flex-shrink-0 ml-4" /> : <ChevronDown size={20} className="flex-shrink-0 ml-4" />}
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-warm-white/60 font-sans text-sm leading-relaxed pt-2 pb-2">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
