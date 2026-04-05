import React from 'react';
import { Image as ImageIcon, Plus, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Gallery: React.FC = () => {
  const placeholders = Array.from({ length: 12 });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-500 mt-1">Capturing moments from UCB events and university chapters.</p>
        </div>
        <button className="px-6 py-3 bg-[#0A2647] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#0A2647]/90 transition-all shadow-xl shadow-blue-900/20">
          <Plus size={20} /> Upload Photos
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {placeholders.map((_, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={idx}
            className="group relative aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <ImageIcon size={48} />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                <Maximize2 size={24} />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <p className="text-white font-bold text-sm">Event Photo #{idx + 1}</p>
              <p className="text-white/70 text-xs">University of Dhaka • 2024</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 p-12 rounded-3xl text-center border border-blue-100">
        <ImageIcon size={48} className="text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready for your memories</h2>
        <p className="text-gray-500 max-w-lg mx-auto">This gallery is ready to showcase the vibrant life of UCB chapters. Start uploading photos from your latest events!</p>
      </div>
    </div>
  );
};
