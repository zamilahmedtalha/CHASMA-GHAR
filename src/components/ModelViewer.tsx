import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Image as ImageIcon } from 'lucide-react';

interface ModelViewerProps {
  title: string;
  embedUrl: string;
  imageUrl: string;
}

export default function ModelViewer({ title, embedUrl, imageUrl }: ModelViewerProps) {
  const [viewMode, setViewMode] = useState<'3d' | 'image'>('3d');

  return (
    <div className="glassmorphism rounded-3xl overflow-hidden p-2 relative group">
      <div className="absolute top-6 right-6 z-20 flex bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/10">
        <button
          onClick={() => setViewMode('3d')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === '3d' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
          }`}
        >
          <Box size={16} /> 3D View
        </button>
        <button
          onClick={() => setViewMode('image')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            viewMode === 'image' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
          }`}
        >
          <ImageIcon size={16} /> Image
        </button>
      </div>

      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40">
        <AnimatePresence mode="wait">
          {viewMode === '3d' ? (
            <motion.div
              key="3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <iframe
                title={title}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src={`${embedUrl}?autostart=1&transparent=1&ui_infos=0&ui_watermark=0&ui_controls=1`}
                className="w-full h-full"
              ></iframe>
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
