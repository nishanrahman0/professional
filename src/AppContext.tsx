import React, { createContext, useContext, useState, useEffect } from 'react';
import { University, Member, Event, Course, Application, Announcement, Certificate } from './types';
import { INITIAL_UNIVERSITIES, INITIAL_MEMBERS, INITIAL_EVENTS, INITIAL_COURSES, INITIAL_APPLICATIONS, INITIAL_ANNOUNCEMENTS } from './data';
import { generateId } from './lib/utils';

interface AppContextType {
  universities: University[];
  members: Member[];
  events: Event[];
  courses: Course[];
  applications: Application[];
  announcements: Announcement[];
  certificates: Certificate[];
  addUniversity: (uni: Omit<University, 'id'>) => void;
  addMember: (member: Omit<Member, 'id' | 'joinDate' | 'certificates' | 'status'>) => void;
  updateMemberStatus: (id: string, status: Member['status']) => void;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string) => void;
  addEvent: (event: Omit<Event, 'id' | 'registeredCount'>) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  toggleCourseStatus: (id: string) => void;
  issueCertificate: (cert: Omit<Certificate, 'id' | 'serialNumber' | 'issueDate'>) => void;
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [universities, setUniversities] = useState<University[]>(INITIAL_UNIVERSITIES);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const addUniversity = (uni: Omit<University, 'id'>) => {
    setUniversities([...universities, { ...uni, id: generateId() }]);
  };

  const addMember = (memberData: Omit<Member, 'id' | 'joinDate' | 'certificates' | 'status'>) => {
    const newMember: Member = {
      ...memberData,
      id: generateId(),
      joinDate: new Date().toISOString().split('T')[0],
      certificates: [],
      status: 'Active',
    };
    setMembers([...members, newMember]);
  };

  const updateMemberStatus = (id: string, status: Member['status']) => {
    setMembers(members.map(m => m.id === id ? { ...m, status } : m));
  };

  const approveApplication = (id: string) => {
    const app = applications.find(a => a.id === id);
    if (app) {
      setApplications(applications.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
      addMember({
        name: app.name,
        email: app.email,
        department: app.department,
        universityId: app.universityId,
        role: 'Member',
        bio: 'New member approved via recruitment.',
      });
    }
  };

  const rejectApplication = (id: string) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
  };

  const addEvent = (eventData: Omit<Event, 'id' | 'registeredCount'>) => {
    setEvents([...events, { ...eventData, id: generateId(), registeredCount: 0 }]);
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    setCourses([...courses, { ...courseData, id: generateId() }]);
  };

  const toggleCourseStatus = (id: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, isOpen: !c.isOpen } : c));
  };

  const issueCertificate = (certData: Omit<Certificate, 'id' | 'serialNumber' | 'issueDate'>) => {
    const newCert: Certificate = {
      ...certData,
      id: generateId(),
      serialNumber: `UCB-${Math.floor(100000 + Math.random() * 900000)}`,
      issueDate: new Date().toISOString().split('T')[0],
    };
    setCertificates([...certificates, newCert]);
    // Update member's certificate list
    setMembers(members.map(m => m.id === certData.memberId ? { ...m, certificates: [...m.certificates, newCert.id] } : m));
  };

  const addAnnouncement = (annData: Omit<Announcement, 'id' | 'date'>) => {
    setAnnouncements([...announcements, { ...annData, id: generateId(), date: new Date().toISOString().split('T')[0] }]);
  };

  return (
    <AppContext.Provider value={{
      universities, members, events, courses, applications, announcements, certificates,
      addUniversity, addMember, updateMemberStatus, approveApplication, rejectApplication,
      addEvent, addCourse, toggleCourseStatus, issueCertificate, addAnnouncement
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
