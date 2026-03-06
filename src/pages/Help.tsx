import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, Package, Truck, RefreshCw, FileText, CreditCard, HelpCircle } from 'lucide-react';

export default function Help() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const categories = [
    { id: 'orders', label: 'Orders & Shipping', icon: Truck },
    { id: 'returns', label: 'Returns & Exchanges', icon: RefreshCw },
    { id: 'prescriptions', label: 'Prescriptions & Lenses', icon: FileText },
    { id: 'payments', label: 'Account & Payments', icon: CreditCard },
    { id: 'general', label: 'General Questions', icon: HelpCircle },
  ];

  const faqs = {
    orders: [
      { q: 'How long does shipping take?', a: 'Standard shipping within Pakistan takes 3-5 business days. Express shipping is available for major cities within 1-2 business days.' },
      { q: 'How can I track my order?', a: 'Once your order ships, you will receive a tracking number via email and SMS. You can also track your order in the "Orders" section of your Account dashboard.' },
      { q: 'Do you offer international shipping?', a: 'Currently, we only ship within Pakistan. We are working on expanding our delivery network soon.' },
    ],
    returns: [
      { q: 'What is your return policy?', a: 'We offer a 14-day hassle-free return policy for non-prescription frames. Prescription lenses are custom-made and non-refundable, but we will remake them if there is an error on our part.' },
      { q: 'How do I initiate a return?', a: 'Log into your account, go to the "Orders" section, select the order, and click "Initiate Return". Follow the prompts to receive a return shipping label.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The funds will be credited back to your original payment method.' },
    ],
    prescriptions: [
      { q: 'How do I submit my prescription?', a: 'You can upload a photo or PDF of your prescription during the checkout process, or email it to us at rx@chasmaghar.com with your order number.' },
      { q: 'What is Pupillary Distance (PD) and how do I measure it?', a: 'PD is the distance between the centers of your pupils. It ensures the optical center of your lenses aligns with your eyes. You can find a guide on how to measure it yourself in our Blog, or ask your optometrist.' },
      { q: 'Can I use an expired prescription?', a: 'For your eye health and safety, we require a valid, unexpired prescription (typically less than 2 years old).' },
    ],
    payments: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, Mastercard), bank transfers, and Cash on Delivery (COD) for orders under Rs. 20,000.' },
      { q: 'Is my payment information secure?', a: 'Yes, all transactions are encrypted using industry-standard SSL technology. We do not store your full credit card information on our servers.' },
    ],
    general: [
      { q: 'Do you have a physical store?', a: 'Yes, our flagship showroom is located in DHA, Karachi. You can find the full address and opening hours on our Contact page.' },
      { q: 'How do I clean my glasses?', a: 'Use the microfiber cloth provided with your glasses and a specialized lens cleaning solution. Avoid using paper towels, clothing, or harsh chemicals, as they can scratch the lenses or damage the coatings.' },
    ]
  };

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header & Search */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Help <span className="text-gradient">Center</span>
          </h1>
          <p className="text-warm-white/70 text-lg leading-relaxed mb-8">
            Find answers to common questions about shipping, returns, prescriptions, and more.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for help..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-14 pr-6 text-warm-white placeholder:text-warm-white/40 focus:outline-none focus:border-cyan-neon transition-colors text-lg"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-white/40" size={24} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          
          {/* Categories Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="glassmorphism rounded-3xl p-6 border border-white/5 sticky top-32">
              <h3 className="font-display font-bold text-lg mb-6 px-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setActiveFaq(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20' 
                        : 'text-warm-white/60 hover:bg-white/5 hover:text-warm-white'
                    }`}
                  >
                    <cat.icon size={18} />
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="flex-1">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glassmorphism-dark rounded-3xl p-8 md:p-12 border border-white/10 min-h-[500px]"
            >
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                {categories.find(c => c.id === activeCategory)?.icon && (
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-cyan-neon">
                    {(() => {
                      const Icon = categories.find(c => c.id === activeCategory)?.icon;
                      return Icon ? <Icon size={24} /> : null;
                    })()}
                  </div>
                )}
                <h2 className="text-3xl font-display font-bold">
                  {categories.find(c => c.id === activeCategory)?.label}
                </h2>
              </div>

              <div className="space-y-4">
                {faqs[activeCategory as keyof typeof faqs].map((faq, i) => (
                  <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-off-black/50">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex justify-between items-center p-6 text-left font-display font-medium hover:text-cyan-neon transition-colors"
                    >
                      <span className="text-lg">{faq.q}</span>
                      {activeFaq === i ? <ChevronUp size={20} className="flex-shrink-0 ml-4 text-cyan-neon" /> : <ChevronDown size={20} className="flex-shrink-0 ml-4 text-warm-white/40" />}
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-white/5">
                            <p className="text-warm-white/70 font-sans leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="mt-16 pt-8 border-t border-white/10 text-center">
                <p className="text-warm-white/60 mb-4">Still need help?</p>
                <div className="flex justify-center gap-4">
                  <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-warm-white rounded-full transition-colors text-sm font-medium">
                    Chat with Support
                  </button>
                  <button className="px-6 py-3 bg-cyan-neon hover:bg-warm-white text-off-black rounded-full transition-colors text-sm font-medium">
                    Contact Us
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
