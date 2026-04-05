import React from 'react';
import { useApp } from '../AppContext';
import { 
  Users, 
  School, 
  Calendar, 
  GraduationCap, 
  ArrowUpRight, 
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { universities, members, events, courses, certificates } = useApp();

  const stats = [
    { label: 'Total Members', value: members.length, icon: Users, color: 'bg-blue-500' },
    { label: 'Universities', value: universities.length, icon: School, color: 'bg-indigo-500' },
    { label: 'Active Events', value: events.filter(e => e.status === 'Open').length, icon: Calendar, color: 'bg-emerald-500' },
    { label: 'Courses', value: courses.length, icon: GraduationCap, color: 'bg-amber-500' },
  ];

  const chartData = universities.map(uni => ({
    name: uni.shortName,
    members: members.filter(m => m.universityId === uni.id).length,
    events: events.filter(e => e.universityId === uni.id).length,
  }));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Nishan</h1>
        <p className="text-gray-500 mt-1">Here's what's happening across UCB today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">University Engagement</h2>
            <button className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
              View Report <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f3f4f6' }}
                />
                <Bar dataKey="members" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="events" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {certificates.slice(0, 5).map((cert, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Certificate Issued</p>
                  <p className="text-xs text-gray-500">Issued to member {cert.memberId} for completing course.</p>
                  <p className="text-[10px] text-gray-400 mt-1">{cert.issueDate}</p>
                </div>
              </div>
            ))}
            {certificates.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-gray-300" />
                </div>
                <p className="text-sm text-gray-500">No recent activity to show.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
