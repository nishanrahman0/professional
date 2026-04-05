import React, { useState, useRef } from 'react';
import { useApp } from '../AppContext';
import { 
  Award, 
  Search, 
  Printer, 
  Download, 
  Plus, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';
import { Certificate, Member, Course } from '../types';
import { UCBLogo } from '../components/UCBLogo';

export const Certificates: React.FC = () => {
  const { certificates, members, courses, issueCertificate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const [newCert, setNewCert] = useState({
    memberId: '',
    courseId: '',
    issuerName: 'UCB Admin',
  });

  const filteredCerts = certificates.filter(c => {
    const member = members.find(m => m.id === c.memberId);
    const course = courses.find(co => co.id === c.courseId);
    return member?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    issueCertificate(newCert);
    setIsModalOpen(false);
    setNewCert({ memberId: '', courseId: '', issuerName: 'UCB Admin' });
  };

  const CertificatePrint = ({ cert }: { cert: Certificate }) => {
    const member = members.find(m => m.id === cert.memberId);
    const course = courses.find(c => c.id === cert.courseId);
    
    return (
      <div className="bg-white p-12 border-[20px] border-double border-[#0A2647] relative overflow-hidden min-h-[600px] flex flex-col items-center text-center">
        <UCBLogo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.03] pointer-events-none" />
        
        <div className="mb-8">
          <UCBLogo className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold text-[#0A2647] tracking-widest uppercase">Certificate of Completion</h1>
        </div>

        <p className="text-xl font-serif text-gray-500 italic mb-8">This is to certify that</p>
        
        <h2 className="text-5xl font-serif font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-2 px-12">{member?.name}</h2>
        
        <p className="text-xl font-serif text-gray-500 italic mb-8">has successfully completed the course</p>
        
        <h3 className="text-3xl font-bold text-[#0A2647] mb-12">{course?.title}</h3>
        
        <div className="flex justify-between w-full mt-auto pt-12">
          <div className="text-left">
            <p className="font-bold text-gray-900 border-t border-gray-300 pt-2 px-4">{cert.issuerName}</p>
            <p className="text-xs text-gray-500 px-4">Authorized Signatory</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 border-t border-gray-300 pt-2 px-4">{formatDate(cert.issueDate)}</p>
            <p className="text-xs text-gray-500 px-4">Date of Issue</p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-[10px] text-gray-400 font-mono">Serial No: {cert.serialNumber}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificate Registry</h1>
          <p className="text-gray-500 mt-1">Manage and issue academic certificates to UCB members.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#0A2647] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#0A2647]/90 transition-all shadow-xl shadow-blue-900/20"
        >
          <Plus size={20} /> Issue New Certificate
        </button>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, course, or serial number..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Recipient</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Serial Number</th>
              <th className="px-6 py-4">Issue Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredCerts.map(cert => {
              const member = members.find(m => m.id === cert.memberId);
              const course = courses.find(c => c.id === cert.courseId);
              return (
                <tr key={cert.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center font-bold text-amber-600"><Award size={20} /></div>
                      <div>
                        <p className="font-semibold text-gray-900">{member?.name}</p>
                        <p className="text-xs text-gray-500">{member?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">{course?.title}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-400">{cert.serialNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(cert.issueDate)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedCert(cert)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"><Printer size={18} /></button>
                      <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"><Download size={18} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredCerts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">No certificates found in the registry.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Issue Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue Certificate</h2>
                <p className="text-gray-500 mb-6">Grant a formal certificate to a member for course completion.</p>
                
                <form onSubmit={handleIssue} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Select Member</label>
                    <select 
                      required
                      value={newCert.memberId}
                      onChange={e => setNewCert({...newCert, memberId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    >
                      <option value="">Choose a member...</option>
                      {members.map(m => <option key={m.id} value={m.id}>{m.name} ({m.email})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Select Course</label>
                    <select 
                      required
                      value={newCert.courseId}
                      onChange={e => setNewCert({...newCert, courseId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    >
                      <option value="">Choose a course...</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Issuer Name</label>
                    <input 
                      required
                      type="text" 
                      value={newCert.issuerName}
                      onChange={e => setNewCert({...newCert, issuerName: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Issue Certificate</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
                <h3 className="font-bold text-gray-900">Certificate Preview</h3>
                <div className="flex gap-2">
                  <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center gap-2"><Printer size={16} /> Print</button>
                  <button onClick={() => setSelectedCert(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold">Close</button>
                </div>
              </div>
              <div className="p-8 bg-gray-100">
                <CertificatePrint cert={selectedCert} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
