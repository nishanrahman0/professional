import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { 
  GraduationCap, 
  BookOpen, 
  User, 
  Clock, 
  Plus, 
  Search, 
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Course } from '../types';

export const Courses: React.FC = () => {
  const { courses, universities, toggleCourseStatus } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Courses</h1>
          <p className="text-gray-500 mt-1">Explore specialized courses and workshops offered by UCB chapters.</p>
        </div>
        <button className="px-6 py-3 bg-[#0A2647] text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-[#0A2647]/90 transition-all shadow-xl shadow-blue-900/20">
          <Plus size={20} /> Create Course
        </button>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <BookOpen size={24} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={cn(
                    "px-2 py-1 text-[10px] font-bold rounded uppercase",
                    course.level === 'Beginner' ? "bg-green-100 text-green-700" :
                    course.level === 'Intermediate' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                  )}>
                    {course.level}
                  </span>
                  <span className={cn(
                    "px-2 py-1 text-[10px] font-bold rounded uppercase",
                    course.isOpen ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  )}>
                    {course.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User size={14} className="text-blue-600" /> {course.instructor}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock size={14} className="text-blue-600" /> {course.modules} Modules
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCourse(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase mb-2 inline-block">
                      {selectedCourse.level}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
                    <p className="text-gray-500 mt-1">Offered by {universities.find(u => u.id === selectedCourse.universityId)?.name}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCourseStatus(selectedCourse.id);
                      setSelectedCourse({...selectedCourse, isOpen: !selectedCourse.isOpen});
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {selectedCourse.isOpen ? <ToggleRight size={32} className="text-green-500" /> : <ToggleLeft size={32} className="text-gray-300" />}
                    <span className="text-xs font-bold text-gray-500">{selectedCourse.isOpen ? 'OPEN' : 'CLOSED'}</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Course Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedCourse.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Instructor</p>
                      <p className="text-sm font-bold text-gray-900">{selectedCourse.instructor}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Modules</p>
                      <p className="text-sm font-bold text-gray-900">{selectedCourse.modules} Lessons</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex gap-3">
                    <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200">
                      Enroll Now
                    </button>
                    <button onClick={() => setSelectedCourse(null)} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200">
                      Close
                    </button>
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
