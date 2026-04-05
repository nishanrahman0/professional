import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Plus, 
  Search, 
  Grid, 
  List,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';

export const Events: React.FC = () => {
  const { events, universities, addEvent } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedUni, setSelectedUni] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredEvents = events.filter(e => {
    const matchesUni = selectedUni === 'All' || e.universityId === selectedUni;
    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    return matchesUni && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events & Workshops</h1>
          <p className="text-gray-500 mt-1">Discover and register for upcoming events across all chapters.</p>
        </div>
        <button className="px-6 py-3 bg-[#0A2647] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#0A2647]/90 transition-all shadow-xl shadow-blue-900/20">
          <Plus size={20} /> Create Event
        </button>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <select value={selectedUni} onChange={e => setSelectedUni(e.target.value)} className="px-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none text-sm font-medium">
            <option value="All">All Universities</option>
            {universities.map(u => <option key={u.id} value={u.id}>{u.shortName}</option>)}
          </select>
          <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="px-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none text-sm font-medium">
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Postponed">Postponed</option>
          </select>
        </div>
        <div className="flex border border-gray-100 rounded-xl overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={cn("p-3 transition-colors", viewMode === 'grid' ? "bg-blue-50 text-blue-600" : "bg-white text-gray-400")}><Grid size={20} /></button>
          <button onClick={() => setViewMode('list')} className={cn("p-3 transition-colors", viewMode === 'list' ? "bg-blue-50 text-blue-600" : "bg-white text-gray-400")}><List size={20} /></button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={event.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all"
            >
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className={cn(
                    "px-2 py-1 text-[10px] font-bold rounded uppercase mb-2 inline-block",
                    event.status === 'Open' ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                  )}>
                    {event.status}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{event.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Calendar size={16} className="text-blue-600" /> {formatDate(event.date)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Clock size={16} className="text-blue-600" /> {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <MapPin size={16} className="text-blue-600" /> {event.location}
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-500">Registration</span>
                    <span className="text-blue-600">{Math.round((event.registeredCount / event.maxSeats) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-1000" 
                      style={{ width: `${(event.registeredCount / event.maxSeats) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 text-right">{event.registeredCount} / {event.maxSeats} seats filled</p>
                </div>

                <button className="w-full py-3 bg-gray-50 text-gray-700 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                  View Details <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">University</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEvents.map(event => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{event.title}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{event.description}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{universities.find(u => u.id === event.universityId)?.shortName}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{formatDate(event.date)}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-blue-600" style={{ width: `${(event.registeredCount / event.maxSeats) * 100}%` }} />
                      </div>
                      <p className="text-[10px] text-gray-400">{event.registeredCount}/{event.maxSeats}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-bold rounded uppercase",
                      event.status === 'Open' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    )}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-900"><ChevronRight size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
