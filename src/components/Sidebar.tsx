import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  GraduationCap, 
  ClipboardList, 
  Bell, 
  Image as ImageIcon, 
  Info, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  School,
  Award,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { UCBLogo } from './UCBLogo';
import { useApp } from '../AppContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const { applications, announcements } = useApp();

  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const highPriorityAnn = announcements.filter(a => a.priority === 'High').length;

  const navGroups = [
    {
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'universities', label: 'Universities', icon: School },
        { id: 'members', label: 'Members', icon: Users, badge: 0 },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'courses', label: 'Courses', icon: GraduationCap },
      ]
    },
    {
      label: 'Info',
      items: [
        { id: 'announcements', label: 'Announcements', icon: Bell, badge: highPriorityAnn },
        { id: 'recruitment', label: 'Recruitment', icon: ClipboardList, badge: pendingApps },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'about', label: 'About UCB', icon: Info },
      ]
    },
    {
      label: 'Admin',
      items: [
        { id: 'certificates', label: 'Certificates', icon: Award },
        { id: 'admin', label: 'Admin Panel', icon: ShieldCheck },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#0A2647] text-white transition-all duration-300 z-50 flex flex-col shadow-2xl",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <div className={cn("flex items-center gap-3 overflow-hidden transition-all", isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto")}>
          <UCBLogo className="w-10 h-10" />
          <span className="font-bold text-xl tracking-tight whitespace-nowrap">UCB Portal</span>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <h3 className="px-6 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                {group.label}
              </h3>
            )}
            <nav className="space-y-1 px-3">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group",
                    activeTab === item.id 
                      ? "bg-white text-[#0A2647] shadow-lg" 
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon size={22} className={cn("shrink-0", activeTab === item.id ? "text-[#0A2647]" : "text-white/60 group-hover:text-white")} />
                  {!isCollapsed && (
                    <span className="font-medium flex-1 text-left">{item.label}</span>
                  )}
                  {item.badge > 0 && (
                    <span className={cn(
                      "absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full",
                      activeTab === item.id ? "bg-[#0A2647] text-white" : "bg-red-500 text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 flex items-center justify-center font-bold text-white shadow-inner">
            NR
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Nishan Rahman</p>
              <p className="text-xs text-white/50 truncate">mdnishanrahman0@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
