export type Role = 'Admin' | 'Moderator' | 'Member' | 'Alumni';
export type Status = 'Active' | 'Inactive' | 'Pending' | 'Deactivated';
export type AppStatus = 'Pending' | 'Approved' | 'Rejected';
export type EventStatus = 'Open' | 'Closed' | 'Postponed';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type Priority = 'Low' | 'Medium' | 'High';

export interface University {
  id: string;
  name: string;
  shortName: string;
  color: string;
  contactEmail: string;
  description: string;
  logo?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  department: string;
  universityId: string;
  role: Role;
  status: Status;
  bio: string;
  certificates: string[];
  joinDate: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  universityId: string;
  department: string;
  statement: string;
  status: AppStatus;
  appliedDate: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  universityId: string;
  maxSeats: number;
  registeredCount: number;
  status: EventStatus;
  image?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  modules: number;
  universityId: string;
  isOpen: boolean;
  instructor: string;
}

export interface Certificate {
  id: string;
  memberId: string;
  courseId: string;
  issueDate: string;
  issuerName: string;
  serialNumber: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  universityId: string | 'All';
  date: string;
}
