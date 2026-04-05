import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  ShieldCheck, 
  Database, 
  Settings as SettingsIcon, 
  TrendingUp, 
  Users, 
  School, 
  Calendar, 
  Download, 
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const AdminPanel: React.FC = () => {
  const { universities, members, events, courses, applications } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'settings'>('overview');

  const roleData = [
    { name: 'Admin', value: members.filter(m => m.role === 'Admin').length },
    { name: 'Moderator', value: members.filter(m => m.role === 'Moderator').length },
    { name: 'Member', value: members.filter(m => m.role === 'Member').length },
    { name: 'Alumni', value: members.filter(m => m.role === 'Alumni').length },
  ];

  const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
          <p className="text-gray-500 mt-1">System-wide management, analytics, and platform configuration.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'overview' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            <TrendingUp size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('database')}
            className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'database' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            <Database size={18} /> Database
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'settings' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700")}
          >
            <SettingsIcon size={18} /> Settings
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-8">Member Role Distribution</h2>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roleData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {roleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
                  <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Pending Apps</span>
                      <span className="text-2xl font-bold">{applications.filter(a => a.status === 'Pending').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Active Events</span>
                      <span className="text-2xl font-bold">{events.filter(e => e.status === 'Open').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Total Courses</span>
                      <span className="text-2xl font-bold">{courses.length}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">System Health</h3>
                  <div className="flex items-center gap-3 text-green-600 mb-2">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-bold">All Systems Operational</span>
                  </div>
                  <p className="text-xs text-gray-500">Last health check performed 5 minutes ago.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'database' && (
          <motion.div key="database" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Data Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Export All Data</h3>
                    <p className="text-sm text-gray-500 mt-1">Download a full backup of the system database in JSON format.</p>
                  </div>
                  <button className="p-4 bg-white text-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all"><Download size={24} /></button>
                </div>
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-red-900">Reset Platform Data</h3>
                    <p className="text-sm text-red-600 mt-1">Permanently delete all records and reset to initial state.</p>
                  </div>
                  <button className="p-4 bg-white text-red-600 rounded-xl shadow-sm hover:shadow-md transition-all"><RefreshCw size={24} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div>
                    <p className="font-bold text-gray-900">Maintenance Mode</p>
                    <p className="text-sm text-gray-500">Temporarily disable public access to the platform.</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                  <div>
                    <p className="font-bold text-gray-900">Allow Public Recruitment</p>
                    <p className="text-sm text-gray-500">Enable the application form for non-members.</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
