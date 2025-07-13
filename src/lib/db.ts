import type { User, Project, Event } from './types';

// --- MOCK DATABASE ---
// In a real application, this would be replaced with a database like Firestore or PostgreSQL.
// We use a simple in-memory array and `setTimeout` to simulate async operations.

let users: User[] = [
  {
    id: '1',
    name: 'Alex Doe',
    avatar: 'https://placehold.co/128x128.png',
    aiHint: 'person smiling',
    headline: 'Computer Science Student | Aspiring Full-Stack Developer',
    email: 'test@example.com',
    password: 'password123',
    skills: [
      'React',
      'Node.js',
      'TypeScript',
      'Python',
      'UI/UX Design',
      'Figma',
      'Project Management',
    ],
    interests: [
      'Artificial Intelligence',
      'Web3',
      'Sustainable Tech',
      'Mobile Development',
    ],
    availability:
      'Available for part-time projects, 10-15 hours/week. Open to mentorship.',
    projects: [
      { name: 'NexusConnect Platform', role: 'Lead Developer' },
      { name: 'Portfolio Website', role: 'Developer' },
    ],
  },
  { id: '2', name: 'Jane Doe', avatar: 'https://placehold.co/100x100.png', aiHint: "woman smiling", headline: 'Data Science & ML Enthusiast', email: 'jane@example.com', skills: ['Python', 'TensorFlow', 'scikit-learn'], interests: ['AI', 'Data Science'], availability: 'Looking for summer internships', projects: [] },
  { id: '3', name: 'John Smith', avatar: 'https://placehold.co/100x100.png', aiHint: "man glasses", headline: 'Frontend Wizard | React & Vue', email: 'john@example.com', skills: ['HTML', 'CSS', 'JavaScript', 'React'], interests: ['Web Dev', 'Design'], availability: 'Open to freelance gigs', projects: [] },
  { id: '4', name: 'Sam Wilson', avatar: 'https://placehold.co/100x100.png', aiHint: "person studio", headline: 'Mobile Dev & IoT Tinkerer', email: 'sam@example.com', skills: ['Flutter', 'Firebase', 'Arduino'], interests: ['Mobile', 'IoT'], availability: 'Available on weekends', projects: [] },
];

let projects: Project[] = [
  {
    id: 'p1',
    title: 'Campus Ride-Sharing App',
    description:
      'A mobile app to connect students for carpooling to and from campus, reducing traffic and environmental impact.',
    skills: ['React Native', 'Firebase', 'Node.js', 'Geolocation'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'mobile app car',
  },
  {
    id: 'p2',
    title: 'Peer-to-Peer Tutoring Platform',
    description:
      'A platform where students can find or become tutors for various subjects, integrated with a scheduling and payment system.',
    skills: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'students learning',
  },
  {
    id: 'p3',
    title: 'Smart Dorm Room Automation',
    description:
      'An IoT project to automate lighting, temperature, and security in dorm rooms using Raspberry Pi and custom sensors.',
    skills: ['IoT', 'Python', 'Raspberry Pi', 'C++'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'smart home',
  },
  {
    id: 'p4',
    title: 'AR Campus Tour Guide',
    description:
      'An augmented reality app that provides an interactive tour of the campus, highlighting key locations and historical facts.',
    skills: ['Unity', 'C#', 'ARKit', 'ARCore'],
    image: 'https://placehold.co/600x400.png',
    aiHint: 'augmented reality campus',
  },
];

let events: Event[] = [
  {
    id: 'e1',
    title: 'NexusConnect Launch Party',
    date: new Date('2024-09-20T18:00:00').toISOString(),
    location: 'Student Union Building',
    description:
      'Join us to celebrate the launch of NexusConnect! Network with fellow students, find project partners, and enjoy free food and drinks.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'party celebration',
  },
  {
    id: 'e2',
    title: 'Advanced React Patterns Workshop',
    date: new Date('2024-09-28T10:00:00').toISOString(),
    location: 'Online via Zoom',
    description:
      'Deep dive into advanced React concepts like hooks, context, and performance optimization. Led by senior students.',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'code workshop',
  },
  {
    id: 'e3',
    title: 'InnovateU Hackathon',
    date: new Date('2024-10-04T17:00:00').toISOString(),
    location: 'Engineering & CS Building',
    description:
      'A 48-hour hackathon focused on creating innovative solutions for campus life. Prizes, mentorship, and fun guaranteed!',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'hackathon team',
  },
];

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));


// --- USER FUNCTIONS ---
export async function getUsers(): Promise<User[]> {
  await simulateDelay(50);
  return users.map(({ password, ...user }) => user); // Don't send password to client
}

export async function getUserById(id: string): Promise<User | undefined> {
    await simulateDelay(50);
    const user = users.find(u => u.id === id);
    if (!user) return undefined;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function getCurrentUser(): Promise<User | undefined> {
    // In a real app, this would be determined by the user's session.
    // We'll just return the first user for now.
    return getUserById('1');
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
    await simulateDelay(500);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        throw new Error("User not found");
    }
    users[userIndex] = { ...users[userIndex], ...data };
    const { password, ...updatedUser } = users[userIndex];
    return updatedUser;
}


// --- PROJECT FUNCTIONS ---
export async function getProjects(): Promise<Project[]> {
  await simulateDelay(50);
  return projects;
}

export async function createProject(project: Project): Promise<Project> {
  await simulateDelay(500);
  projects.unshift(project); // Add to the beginning of the list
  return project;
}


// --- EVENT FUNCTIONS ---
export async function getEvents(): Promise<Event[]> {
    await simulateDelay(50);
    return events;
}

export async function createEvent(event: Event): Promise<Event> {
    await simulateDelay(500);
    events.unshift(event);
    return event;
}
