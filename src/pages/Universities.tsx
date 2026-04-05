import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Plus, 
  Mail, 
  ExternalLink, 
  Users, 
  Calendar, 
  GraduationCap, 
  ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { University } from '../types';

export const Universities: React.FC = () => {
  const { universities, members, events, courses, addUniversity } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const [newUni, setNewUni] = useState({
    name: '',
    shortName: '',
    color: '#3b82f6',
    contactEmail: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUniversity(newUni);
    setIsModalOpen(false);
    setNewUni({ name: '', shortName: '', color: '#3b82f6', contactEmail: '', description: '' });
  };

  if (selectedUni) {
    const uniMembers = members.filter(m => m.universityId === selectedUni.id);
    const uniEvents = events.filter(e => e.universityId === selectedUni.id);
    const uniCourses = courses.filter(c => c.universityId === selectedUni.id);

    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedUni(null)} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
          &larr; Back to Universities
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32" style={{ backgroundColor: selectedUni.color }}></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              <div className="w-24 h-24 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl font-bold border-4 border-white" style={{ color: selectedUni.color }}>
                {selectedUni.shortName}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedUni.name}</h1>
                <p className="text-gray-500 flex items-center gap-2 mt-1"><Mail size={16} /> {selectedUni.contactEmail}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"><ExternalLink size={18} /> Website</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Contact Admin</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100">
            <div className="flex px-8 overflow-x-auto scrollbar-hide">
              {['overview', 'members', 'events', 'recruitment', 'courses'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-6 py-4 text-sm font-semibold capitalize transition-all border-b-2", activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700")}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">About the Chapter</h2>
                <p className="text-gray-600 leading-relaxed max-w-3xl">{selectedUni.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="p-6 bg-blue-50 rounded-2xl"><Users className="text-blue-600 mb-3" /><p className="text-2xl font-bold text-gray-900">{uniMembers.length}</p><p className="text-sm text-gray-500">Active Members</p></div>
                  <div className="p-6 bg-emerald-50 rounded-2xl"><Calendar className="text-emerald-600 mb-3" /><p className="text-2xl font-bold text-gray-900">{uniEvents.length}</p><p className="text-sm text-gray-500">Upcoming Events</p></div>
                  <div className="p-6 bg-amber-50 rounded-2xl"><GraduationCap className="text-amber-600 mb-3" /><p className="text-2xl font-bold text-gray-900">{uniCourses.length}</p><p className="text-sm text-gray-500">Available Courses</p></div>
                </div>
              </motion.div>
            )}
            {activeTab === 'members' && (
              <motion.div key="members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Chapter Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {uniMembers.map(member => (
                    <div key={member.id} className="p-4 border border-gray-100 rounded-2xl flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">{member.name.charAt(0)}</div>
                      <div><p className="font-semibold text-gray-900">{member.name}</p><p className="text-xs text-gray-500">{member.department} • {member.role}</p></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'events' && (
              <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Chapter Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {uniEvents.map(event => (
                    <div key={event.id} className="p-6 border border-gray-100 rounded-2xl">
                      <div className="flex justify-between items-start mb-4"><h3 className="font-bold text-gray-900">{event.title}</h3><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">{event.status}</span></div>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                        <span className="flex items-center gap-1"><Users size={14} /> {event.registeredCount}/{event.maxSeats}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'recruitment' && (
              <motion.div key="recruitment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="max-w-xl mx-auto text-center py-12">
                  <ClipboardList size={48} className="text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Join {selectedUni.shortName} Chapter</h2>
                  <p className="text-gray-500 mb-8">Apply now to become a part of the UCB community at {selectedUni.name}.</p>
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">Apply for Membership</button>
                </div>
              </motion.div>
            )}
            {activeTab === 'courses' && (
              <motion.div key="courses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Academic Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {uniCourses.map(course => (
                    <div key={course.id} className="p-6 border border-gray-100 rounded-2xl">
                      <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-gray-900">{course.title}</h3><span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">{course.level}</span></div>
                      <p className="text-sm text-gray-500 mb-4">{course.modules} Modules • Instructor: {course.instructor}</p>
                      <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors">View Course Details</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">University Chapters</h1>
          <p className="text-gray-500 mt-1">Manage and explore active university chapters across Bangladesh.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-[#0A2647] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#0A2647]/90 transition-all shadow-xl shadow-blue-900/20">
          <Plus size={20} /> Create New Chapter
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {universities.map((uni, idx) => (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} key={uni.id} onClick={() => setSelectedUni(uni)} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-24 relative" style={{ backgroundColor: uni.color }}>
              <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl font-bold border-4 border-white" style={{ color: uni.color }}>{uni.shortName}</div>
            </div>
            <div className="p-6 pt-12">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{uni.name}</h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{uni.description}</p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-1 text-xs text-gray-400"><Users size={14} /> {members.filter(m => m.universityId === uni.id).length}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400"><Calendar size={14} /> {events.filter(e => e.universityId === uni.id).length}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400"><GraduationCap size={14} /> {courses.filter(c => c.universityId === uni.id).length}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">New University Chapter</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">University Name</label><input required type="text" value={newUni.name} onChange={e => setNewUni({...newUni, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Short Name</label><input required type="text" value={newUni.shortName} onChange={e => setNewUni({...newUni, shortName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Theme Color</label><input type="color" value={newUni.color} onChange={e => setNewUni({...newUni, color: e.target.value})} className="w-full h-[50px] p-1 rounded-xl border border-gray-200 outline-none" /></div>
                  </div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">Contact Email</label><input required type="email" value={newUni.contactEmail} onChange={e => setNewUni({...newUni, contactEmail: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">Description</label><textarea required rows={3} value={newUni.description} onChange={e => setNewUni({...newUni, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none" /></div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Create Chapter</button>
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
