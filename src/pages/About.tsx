import React from 'react';
import { UCBLogo } from '../components/UCBLogo';
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const values = [
    { title: 'Excellence', desc: 'Striving for the highest standards in education and community service.', icon: Award, color: 'bg-blue-500' },
    { title: 'Inclusivity', desc: 'Creating a welcoming space for students from all backgrounds.', icon: Users, color: 'bg-indigo-500' },
    { title: 'Innovation', desc: 'Embracing new technologies and methodologies in learning.', icon: Target, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-16 pb-12">
      <header className="text-center max-w-3xl mx-auto space-y-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center">
          <UCBLogo className="w-32 h-32 shadow-2xl rounded-full" />
        </motion.div>
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">University Canvas of Bangladesh</h1>
        <p className="text-xl text-gray-500 leading-relaxed">Empowering the next generation of leaders through a unified academic and community platform.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <Target size={28} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To create a centralized digital ecosystem that bridges the gap between university chapters, 
            fostering collaboration, academic excellence, and professional growth for students across Bangladesh.
          </p>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
            <Eye size={28} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To be the premier platform for student engagement in Bangladesh, recognized for its contribution 
            to building a skilled, connected, and socially responsible student community.
          </p>
        </motion.div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4 hover:shadow-xl transition-all"
            >
              <div className={`${v.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg`}>
                <v.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{v.title}</h3>
              <p className="text-gray-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#0A2647] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <UCBLogo className="absolute -right-20 -bottom-20 w-[400px] h-[400px] opacity-10 pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Get in Touch</h2>
            <p className="text-white/70 text-lg">Have questions or want to start a chapter at your university? Reach out to us!</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Mail size={20} /></div>
                <span className="text-lg">contact@ucb.org.bd</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Phone size={20} /></div>
                <span className="text-lg">+880 1234 567890</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><MapPin size={20} /></div>
                <span className="text-lg">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center lg:items-end gap-8">
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Globe].map((Social, idx) => (
                <button key={idx} className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white text-white hover:text-[#0A2647] transition-all">
                  <Social size={28} />
                </button>
              ))}
            </div>
            <p className="text-white/40 text-sm">© 2024 University Canvas of Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
