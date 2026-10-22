export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.ahmedcodes.pro';
export const profile = {
  name: 'Ahmed Ali',
  title: 'Full-Stack Developer & Educator',
  description: 'Ahmed Ali is a full-stack developer, Computer Science undergraduate, and educator in Pakistan. Explore his software, teaching, and creative work.',
  github: 'https://github.com/ahmed-codes-26',
  linkedin: 'https://www.linkedin.com/in/ahmedcodes',
  instagram: 'https://www.instagram.com/ahmed._.for_sure/',
};
export const chapters = [
  { id: 'beginning', label: 'The beginning', index: '00' },
  { id: 'about', label: 'The human', index: '01' },
  { id: 'work', label: 'The builder', index: '02' },
  { id: 'teaching', label: 'The educator', index: '03' },
  { id: 'creative', label: 'The creative mind', index: '04' },
  { id: 'between', label: 'The space between', index: '05' },
  { id: 'connect', label: 'Still becoming', index: '06' },
];
export type Project = {
  slug: string; number: string; name: string; category: string; summary: string;
  stack: string[]; repo: string; problem: string; approach: string; features: string[];
  reflection: string; role: string; visual: 'academy' | 'konekt';
};
export const projects: Project[] = [
  {
    slug: 'myacademy-portal', number: '01', name: 'MyAcademy Portal', category: 'EDUCATION / FULL-STACK',
    summary: 'A classroom problem. A full-stack answer. One place for the attendance, fees, resources, and people that keep an academy running.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'], repo: `${profile.github}/MyAcademy-Portal`,
    problem: 'Running MyAcademy meant managing attendance, fee records, learning resources, and communication alongside teaching. I wanted a system shaped around those everyday responsibilities.',
    approach: 'I built a MERN application with separate admin, teacher, and student experiences. Protected React routes connect to an Express API, with MongoDB storing application data and JWT authentication supporting role-based access.',
    features: ['Admin tools for student and teacher records', 'Teacher workflows for attendance and fee tracking', 'Student access to attendance, fees, and class resources', 'Cloudinary storage for notes and documents', 'WhatsApp-Web.js communication integration'],
    reflection: 'This project connects the classroom to the codebase. It brought application permissions, media handling, and real administrative workflows into the same system.',
    role: 'Full-stack development · Personal academy project', visual: 'academy',
  },
  {
    slug: 'konekt', number: '02', name: 'Konekt', category: 'SOCIAL / REAL-TIME',
    summary: 'Exploring what happens between people, posts, and real-time events. A social application built from the backend out.',
    stack: ['Node.js', 'Express', 'Socket.io', 'MongoDB'], repo: `${profile.github}/Konekt`,
    problem: 'During my remote web-development internship at Arch Technologies, I took on a social networking application that brought authentication, shared content, relationships, and real-time interactions together.',
    approach: 'I used Node.js and Express with EJS views, MongoDB and Mongoose for persistence, and Socket.io for real-time communication. JWT, bcrypt, and Multer support authentication, password handling, and media uploads.',
    features: ['Registration, email verification, and account recovery', 'Customizable public and private profiles', 'Posts, image uploads, likes, and comments', 'Friend requests and relationship management', 'Real-time interactions and persistent notifications'],
    reflection: 'Working with online and offline users made notification persistence and socket sessions a practical engineering concern. Konekt was the most substantial of my four internship projects.',
    role: 'Full-stack development · Arch Technologies internship', visual: 'konekt',
  },
];
export const archive = [
  { name: 'Attendance Manager', type: 'Python · Education automation', href: `${profile.github}/Attendance-Manager` },
  { name: 'Connect Communication Services', type: 'Multipage website · Frontend', href: `${profile.github}/connect-communication-services` },
  { name: 'Cricket Scoring Application', type: 'C++ · Independent programming project', href: null },
];
export const capabilities = [
  { title: 'Interfaces', detail: 'Applied in web projects', skills: 'React · JavaScript · HTML & CSS · EJS · Responsive design' },
  { title: 'Behind the interface', detail: 'Applied in full-stack projects', skills: 'Node.js · Express · MongoDB · Mongoose · REST APIs · JWT · Socket.io' },
  { title: 'The foundations', detail: 'Academic study & independent practice', skills: 'C / C++ · Python · Object-oriented programming · Data structures · MySQL · SQLite' },
  { title: 'The everyday toolkit', detail: 'Development & creative workflow', skills: 'Git & GitHub · VS Code · Cloudinary · Render · Premiere Pro' },
];
