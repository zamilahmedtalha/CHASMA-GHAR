import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Package, MapPin, Heart, Settings, LogOut, FileText } from 'lucide-react';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-off-black min-h-screen pt-32 pb-20 font-sans">
      <div className="container mx-auto px-6">
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="glassmorphism-dark rounded-3xl p-6 border border-white/5 sticky top-32">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-neon to-pastel-purple flex items-center justify-center text-off-black font-display font-bold text-xl">
                    ZA
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-warm-white">Zainab Ahmed</h2>
                    <p className="text-xs text-warm-white/50">zainab@example.com</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeTab === tab.id 
                          ? 'bg-white/10 text-cyan-neon border border-white/10' 
                          : 'text-warm-white/60 hover:bg-white/5 hover:text-warm-white'
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-magenta-neon/80 hover:bg-magenta-neon/10 hover:text-magenta-neon transition-all mt-8">
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glassmorphism rounded-3xl p-8 md:p-12 border border-white/10 min-h-[600px]"
              >
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-8">Personal Information</h2>
                    <form className="space-y-6 max-w-2xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-warm-white/70 mb-2">First Name</label>
                          <input type="text" defaultValue="Zainab" className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white focus:border-cyan-neon transition-colors" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-white/70 mb-2">Last Name</label>
                          <input type="text" defaultValue="Ahmed" className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white focus:border-cyan-neon transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-white/70 mb-2">Email Address</label>
                        <input type="email" defaultValue="zainab@example.com" className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white focus:border-cyan-neon transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-white/70 mb-2">Phone Number</label>
                        <input type="tel" defaultValue="+92 300 1234567" className="w-full bg-off-black border border-white/10 rounded-xl px-4 py-3 text-warm-white focus:border-cyan-neon transition-colors" />
                      </div>
                      <button type="button" className="px-8 py-3 bg-warm-white text-off-black font-semibold rounded-xl hover:bg-cyan-neon transition-colors mt-8">
                        Save Changes
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-8">Order History</h2>
                    <div className="space-y-6">
                      {[
                        { id: 'ORD-2024-001', date: 'Oct 15, 2024', status: 'Delivered', total: 'Rs. 12,500', items: 2 },
                        { id: 'ORD-2024-089', date: 'Nov 02, 2024', status: 'Processing', total: 'Rs. 8,500', items: 1 },
                      ].map(order => (
                        <div key={order.id} className="bg-off-black rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-display font-bold text-lg">{order.id}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-cyan-neon/20 text-cyan-neon' : 'bg-pastel-purple/20 text-pastel-purple'}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-warm-white/60">{order.date} • {order.items} items</p>
                          </div>
                          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                            <span className="font-mono font-medium">{order.total}</span>
                            <button className="text-sm text-cyan-neon hover:text-warm-white transition-colors underline">View Details</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'prescriptions' && (
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-display font-bold">My Prescriptions</h2>
                      <button className="px-4 py-2 bg-white/10 text-warm-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
                        + Add New
                      </button>
                    </div>
                    
                    <div className="bg-off-black rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-neon" />
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-display font-bold text-xl mb-1">Dr. Ali's Clinic - Oct 2024</h3>
                          <p className="text-sm text-warm-white/50">Valid until Oct 2025</p>
                        </div>
                        <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-warm-white/70">Primary</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div>
                          <p className="text-xs text-warm-white/50 mb-1 uppercase tracking-wider">Eye</p>
                          <p className="font-medium">OD (Right)</p>
                          <p className="font-medium">OS (Left)</p>
                        </div>
                        <div>
                          <p className="text-xs text-warm-white/50 mb-1 uppercase tracking-wider">SPH</p>
                          <p className="font-mono">-1.50</p>
                          <p className="font-mono">-1.25</p>
                        </div>
                        <div>
                          <p className="text-xs text-warm-white/50 mb-1 uppercase tracking-wider">CYL</p>
                          <p className="font-mono">-0.50</p>
                          <p className="font-mono">SPH</p>
                        </div>
                        <div>
                          <p className="text-xs text-warm-white/50 mb-1 uppercase tracking-wider">AXIS</p>
                          <p className="font-mono">180</p>
                          <p className="font-mono">-</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                        <p className="text-sm"><span className="text-warm-white/50">PD:</span> 62mm</p>
                        <button className="text-sm text-cyan-neon hover:text-warm-white transition-colors underline ml-auto">Edit</button>
                        <button className="text-sm text-magenta-neon hover:text-warm-white transition-colors underline">Delete</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Placeholders for other tabs */}
                {['addresses', 'wishlist', 'settings'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-warm-white/30">
                      {activeTab === 'addresses' && <MapPin size={32} />}
                      {activeTab === 'wishlist' && <Heart size={32} />}
                      {activeTab === 'settings' && <Settings size={32} />}
                    </div>
                    <h2 className="text-2xl font-display font-bold mb-2 capitalize">{activeTab}</h2>
                    <p className="text-warm-white/50">This section is currently under development.</p>
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
