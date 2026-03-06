import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';

// Mock Cart Data
const initialCartItems = [
  { id: 1, name: 'The Architect', price: 8500, quantity: 1, color: 'Charcoal Black', lens: 'Blue Light Filter (+ Rs. 2,000)', image: '/glasses-1.png' },
  { id: 2, name: 'Neon Nights', price: 12000, quantity: 1, color: 'Cyan', lens: 'Standard Clear (+ Rs. 1,000)', image: '/glasses-2.png' },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 15000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "923009248342";
    let message = "Hello! I would like to place an order from Chasma Ghar:\n\n";
    
    cartItems.forEach(item => {
      message += `- ${item.name} (${item.color}, ${item.lens}) x${item.quantity} - Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\nSubtotal: Rs. ${subtotal.toLocaleString()}`;
    message += `\nShipping: ${shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}`;
    message += `\n*Total: Rs. ${total.toLocaleString()}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-12 flex items-center gap-4">
            Your <span className="dynamic-text">Cart</span>
            <span className="text-xl font-normal text-warm-white/50 bg-white/5 px-4 py-1 rounded-full border border-white/10">
              {cartItems.length} items
            </span>
          </h1>

          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 glassmorphism-dark rounded-3xl border border-white/5"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={48} className="text-warm-white/30" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4">Your cart is empty</h2>
              <p className="text-warm-white/60 mb-8 max-w-md mx-auto">
                Looks like you haven't added any luxury frames to your cart yet. Let's find your perfect pair.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 dynamic-bg text-black font-semibold rounded-full hover:opacity-80 transition-opacity">
                Explore Collections <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence>
                  {cartItems.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      className="flex flex-col sm:flex-row gap-6 p-6 glassmorphism rounded-2xl border border-white/10 relative group hover:dynamic-border transition-colors"
                    >
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="absolute top-4 right-4 text-warm-white/40 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>

                      <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-luminosity opacity-80" referrerPolicy="no-referrer" />
                      </div>

                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-xl font-display font-bold mb-1">{item.name}</h3>
                          <p className="text-sm text-warm-white/60 mb-1">Color: {item.color}</p>
                          <p className="text-sm text-warm-white/60 mb-4">Lens: {item.lens}</p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-4 bg-off-black rounded-full px-4 py-2 border border-white/10">
                            <button onClick={() => updateQuantity(item.id, -1)} className="text-warm-white/60 hover:dynamic-text transition-colors" disabled={item.quantity <= 1}>
                              <Minus size={16} />
                            </button>
                            <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="text-warm-white/60 hover:dynamic-text transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="text-lg font-mono font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glassmorphism-dark rounded-3xl p-8 border border-white/5 sticky top-32">
                  <h2 className="text-xl font-display font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-warm-white/70">
                      <span>Subtotal</span>
                      <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-warm-white/70">
                      <span>Shipping</span>
                      <span className="font-mono">{shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs dynamic-text text-right">Add Rs. {(15000 - subtotal).toLocaleString()} more for free shipping</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-8 pt-4 border-t border-white/10">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-mono font-bold dynamic-text">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>

                  <button 
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 dynamic-bg text-black font-bold rounded-xl hover:opacity-80 transition-opacity mb-4 flex items-center justify-center gap-2"
                  >
                    Checkout via WhatsApp
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-warm-white/50 mt-6">
                    <ShieldCheck size={16} className="dynamic-text" />
                    <span>Secure Checkout & 14-Day Returns</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
