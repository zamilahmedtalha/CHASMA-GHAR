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
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900/50 group">
      <div className="absolute top-4 right-4 z-20 flex bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setViewMode('3d')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            viewMode === '3d' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Box size={14} /> 3D
        </button>
        <button
          onClick={() => setViewMode('image')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            viewMode === 'image' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ImageIcon size={14} /> Image
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === '3d' ? (
          <motion.div
            key="3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <iframe
              title={title}
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src={`${embedUrl}?autostart=1&transparent=1&ui_infos=0&ui_watermark=0&ui_controls=0`}
              className="w-full h-full"
            ></iframe>
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <img src={imageUrl} alt={title} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <h3 className="text-white font-medium tracking-tight bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-sm">
          {title}
        </h3>
      </div>
    </div>
  );
}
