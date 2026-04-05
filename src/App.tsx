import React, { useState } from 'react';
import { AppProvider } from './AppContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Universities } from './pages/Universities';
import { Members } from './pages/Members';
import { Recruitment } from './pages/Recruitment';
import { Events } from './pages/Events';
import { Courses } from './pages/Courses';
import { Certificates } from './pages/Certificates';
import { Announcements } from './pages/Announcements';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { AdminPanel } from './pages/AdminPanel';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'universities': return <Universities />;
      case 'members': return <Members />;
      case 'recruitment': return <Recruitment />;
      case 'events': return <Events />;
      case 'courses': return <Courses />;
      case 'certificates': return <Certificates />;
      case 'announcements': return <Announcements />;
      case 'gallery': return <Gallery />;
      case 'about': return <About />;
      case 'admin': return <AdminPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        
        <main className={cn(
          "flex-1 transition-all duration-300 p-8 lg:p-12",
          isSidebarCollapsed ? "ml-20" : "ml-64"
        )}>
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AppProvider>
  );
}
