import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Download, 
  MoreVertical,
  UserPlus,
  Mail,
  MapPin,
  Award,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';
import { Member } from '../types';

export const Members: React.FC = () => {
  const { members, universities, updateMemberStatus } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUni, setSelectedUni] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUni = selectedUni === 'All' || m.universityId === selectedUni;
    const matchesRole = selectedRole === 'All' || m.role === selectedRole;
    return matchesSearch && matchesUni && matchesRole;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'University', 'Department', 'Role', 'Status', 'Join Date'];
    const rows = filteredMembers.map(m => [
      m.name,
      m.email,
      universities.find(u => u.id === m.universityId)?.shortName || 'Unknown',
      m.department,
      m.role,
      m.status,
      m.joinDate
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ucb_members.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members Database</h1>
          <p className="text-gray-500 mt-1">Directory of all active and alumni members across UCB chapters.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportToCSV} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-50 transition-all">
            <Download size={18} /> Export CSV
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
            <UserPlus size={20} /> Add Member
          </button>
        </div>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email, or department..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedUni}
            onChange={e => setSelectedUni(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none text-sm font-medium"
          >
            <option value="All">All Universities</option>
            {universities.map(u => <option key={u.id} value={u.id}>{u.shortName}</option>)}
          </select>
          <select 
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none text-sm font-medium"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Member">Member</option>
            <option value="Alumni">Alumni</option>
          </select>
          <div className="flex border border-gray-100 rounded-xl overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={cn("p-3 transition-colors", viewMode === 'grid' ? "bg-blue-50 text-blue-600" : "bg-white text-gray-400")}><Grid size={20} /></button>
            <button onClick={() => setViewMode('list')} className={cn("p-3 transition-colors", viewMode === 'list' ? "bg-blue-50 text-blue-600" : "bg-white text-gray-400")}><List size={20} /></button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500">
                  {member.name.charAt(0)}
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><MoreVertical size={18} /></button>
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{member.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{member.department}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">{member.role}</span>
                <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded uppercase">{universities.find(u => u.id === member.universityId)?.shortName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className={cn("w-2 h-2 rounded-full", member.status === 'Active' ? "bg-green-500" : "bg-gray-300")} />
                {member.status}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">University</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMembers.map(member => (
                <tr key={member.id} onClick={() => setSelectedMember(member)} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">{member.name.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{universities.find(u => u.id === member.universityId)?.shortName}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">{member.role}</span></td>
                  <td className="px-6 py-4"><span className={cn("px-2 py-1 text-[10px] font-bold rounded uppercase", member.status === 'Active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700")}>{member.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(member.joinDate)}</td>
                  <td className="px-6 py-4 text-right"><button className="p-2 text-gray-400 hover:text-gray-900"><MoreVertical size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Member Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMember(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700" />
              <div className="p-8 pt-0">
                <div className="relative -mt-12 mb-6 flex items-end justify-between">
                  <div className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center text-4xl font-bold border-4 border-white text-blue-600">
                    {selectedMember.name.charAt(0)}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateMemberStatus(selectedMember.id, selectedMember.status === 'Active' ? 'Deactivated' : 'Active')} className={cn("px-4 py-2 rounded-xl text-sm font-bold transition-all", selectedMember.status === 'Active' ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100")}>
                      {selectedMember.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">Edit Profile</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                      <p className="text-gray-500">{selectedMember.department} • {universities.find(u => u.id === selectedMember.universityId)?.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Bio</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedMember.bio}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Certificates Earned</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedMember.certificates.map(certId => (
                          <div key={certId} className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100">
                            <Award size={16} />
                            <span className="text-xs font-bold">{certId}</span>
                          </div>
                        ))}
                        {selectedMember.certificates.length === 0 && <p className="text-sm text-gray-400 italic">No certificates earned yet.</p>}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-2xl space-y-4">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Mail size={18} className="text-blue-600" />
                        <span className="text-xs font-medium truncate">{selectedMember.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <MapPin size={18} className="text-blue-600" />
                        <span className="text-xs font-medium">Dhaka, Bangladesh</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar size={18} className="text-blue-600" />
                        <span className="text-xs font-medium">Joined {formatDate(selectedMember.joinDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
