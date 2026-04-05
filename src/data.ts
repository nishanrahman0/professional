import { University, Member, Event, Course, Application, Announcement } from './types';

export const INITIAL_UNIVERSITIES: University[] = [
  {
    id: 'du',
    name: 'University of Dhaka',
    shortName: 'DU',
    color: '#003366',
    contactEmail: 'du@ucb.org',
    description: 'The oldest and most prestigious university in Bangladesh.',
  },
  {
    id: 'buet',
    name: 'Bangladesh University of Engineering and Technology',
    shortName: 'BUET',
    color: '#800000',
    contactEmail: 'buet@ucb.org',
    description: 'The premier engineering institution of the country.',
  },
  {
    id: 'nsu',
    name: 'North South University',
    shortName: 'NSU',
    color: '#006633',
    contactEmail: 'nsu@ucb.org',
    description: 'The first private university in Bangladesh.',
  },
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Nishan Rahman',
    email: 'nishan@example.com',
    department: 'Computer Science',
    universityId: 'du',
    role: 'Admin',
    status: 'Active',
    bio: 'Passionate about technology and education.',
    certificates: ['cert-1'],
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    department: 'Electrical Engineering',
    universityId: 'buet',
    role: 'Moderator',
    status: 'Active',
    bio: 'Enthusiastic about robotics.',
    certificates: [],
    joinDate: '2024-02-10',
  },
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Tech Summit 2024',
    description: 'Annual technology conference showcasing innovations.',
    date: '2024-05-20',
    time: '10:00 AM',
    location: 'TSC Auditorium, DU',
    universityId: 'du',
    maxSeats: 200,
    registeredCount: 150,
    status: 'Open',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript.',
    level: 'Beginner',
    modules: 12,
    universityId: 'du',
    isOpen: true,
    instructor: 'Dr. Kamal Hossain',
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'a1',
    name: 'John Doe',
    email: 'john@example.com',
    universityId: 'nsu',
    department: 'Business Administration',
    statement: 'I want to contribute to the community.',
    status: 'Pending',
    appliedDate: '2024-04-01',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann1',
    title: 'Welcome to UCB Platform',
    content: 'We are excited to launch our new centralized platform.',
    priority: 'High',
    universityId: 'All',
    date: '2024-04-05',
  },
];
