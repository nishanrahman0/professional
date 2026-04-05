import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  Info, 
  CheckCircle2,
  Calendar,
  School
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';

export const Announcements: React.FC = () => {
  const { announcements, universities, addAnnouncement } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState('All');

  const [newAnn, setNewAnn] = useState({
    title: '',
    content: '',
    priority: 'Medium' as const,
    universityId: 'All',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement(newAnn);
    setIsModalOpen(false);
    setNewAnn({ title: '', content: '', priority: 'Medium', universityId: 'All' });
  };

  const filteredAnn = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUni = selectedUni === 'All' || a.universityId === selectedUni;
    return matchesSearch && matchesUni;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500 mt-1">Stay updated with platform-wide and university-specific news.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#0A2647] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#0A2647]/90 transition-all shadow-xl shadow-blue-900/20"
        >
          <Plus size={20} /> Post Announcement
        </button>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search announcements..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none"
          />
        </div>
        <select 
          value={selectedUni}
          onChange={e => setSelectedUni(e.target.value)}
          className="px-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none text-sm font-medium"
        >
          <option value="All">All Chapters</option>
          {universities.map(u => <option key={u.id} value={u.id}>{u.shortName}</option>)}
        </select>
      </div>

      <div className="space-y-6">
        {filteredAnn.map((ann, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={ann.id}
            className={cn(
              "p-6 rounded-3xl shadow-sm border flex gap-6 group hover:shadow-xl transition-all",
              ann.priority === 'High' ? "bg-red-50 border-red-100" : 
              ann.priority === 'Medium' ? "bg-blue-50 border-blue-100" : "bg-white border-gray-100"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
              ann.priority === 'High' ? "bg-red-500 text-white" : 
              ann.priority === 'Medium' ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
            )}>
              {ann.priority === 'High' ? <AlertTriangle size={24} /> : 
               ann.priority === 'Medium' ? <Bell size={24} /> : <Info size={24} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{ann.title}</h3>
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Calendar size={14} /> {formatDate(ann.date)}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{ann.content}</p>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded uppercase",
                  ann.priority === 'High' ? "bg-red-100 text-red-700" : 
                  ann.priority === 'Medium' ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                )}>
                  {ann.priority} Priority
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
                  <School size={12} /> {ann.universityId === 'All' ? 'Platform Wide' : universities.find(u => u.id === ann.universityId)?.shortName}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredAnn.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <Bell size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 italic">No announcements found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Post Announcement Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input required type="text" value={newAnn.title} onChange={e => setNewAnn({...newAnn, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                      <select value={newAnn.priority} onChange={e => setNewAnn({...newAnn, priority: e.target.value as any})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Target Chapter</label>
                      <select value={newAnn.universityId} onChange={e => setNewAnn({...newAnn, universityId: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
                        <option value="All">All Chapters</option>
                        {universities.map(u => <option key={u.id} value={u.id}>{u.shortName}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                    <textarea required rows={4} value={newAnn.content} onChange={e => setNewAnn({...newAnn, content: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none" />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Post Now</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
