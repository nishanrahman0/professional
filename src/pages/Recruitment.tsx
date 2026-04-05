import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  ClipboardList, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Mail, 
  Clock,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';

export const Recruitment: React.FC = () => {
  const { applications, universities, approveApplication, rejectApplication } = useApp();
  const [activeTab, setActiveTab] = useState<'applications' | 'form'>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredApps = applications.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUni = selectedUni === 'All' || a.universityId === selectedUni;
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;
    return matchesSearch && matchesUni && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruitment Portal</h1>
          <p className="text-gray-500 mt-1">Manage membership applications and recruitment drives.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('applications')}
            className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all", activeTab === 'applications' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            Applications
          </button>
          <button 
            onClick={() => setActiveTab('form')}
            className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all", activeTab === 'form' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            Application Form
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'applications' ? (
          <motion.div key="apps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none"
                />
              </div>
              <div className="flex gap-2">
                <select value={selectedUni} onChange={e => setSelectedUni(e.target.value)} className="px-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none text-sm font-medium">
                  <option value="All">All Universities</option>
                  {universities.map(u => <option key={u.id} value={u.id}>{u.shortName}</option>)}
                </select>
                <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="px-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none text-sm font-medium">
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">University</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Applied Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600">{app.name.charAt(0)}</div>
                          <div>
                            <p className="font-semibold text-gray-900">{app.name}</p>
                            <p className="text-xs text-gray-500">{app.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{universities.find(u => u.id === app.universityId)?.shortName}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 text-[10px] font-bold rounded uppercase",
                          app.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                          app.status === 'Approved' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(app.appliedDate)}</td>
                      <td className="px-6 py-4 text-right">
                        {app.status === 'Pending' && (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => approveApplication(app.id)} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"><CheckCircle size={18} /></button>
                            <button onClick={() => rejectApplication(app.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"><XCircle size={18} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">No applications found matching your criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Membership Application</h2>
            <p className="text-gray-500 mb-8">Fill out the form below to apply for UCB membership. This form is for demo purposes.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="john@example.edu" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">University</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none">
                    {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" placeholder="e.g. Computer Science" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Why do you want to join UCB?</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none" placeholder="Tell us about your motivation..." />
              </div>
              <button type="button" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Submit Application
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
