const experienceStart = new Date(2024, 8, 1);

function calculateExperienceYears(startDate) {
  const now = new Date();
  const totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const years = Math.max(1, Math.floor(totalMonths / 12));
  return `${years}+`;
}

const projects = [
  {
    name: 'Epitech x Vueling Hackathon',
    context: 'Hackathon Project',
    description: 'Built an offline translation tool designed for airplane use cases with unstable connectivity.',
    stack: ['React.js', 'Node.js'],
    type: 'Web Application'
  },
  {
    name: 'Epitech x Onepoint Hackathon',
    context: 'Hackathon Project',
    description: 'Created an eco-responsible chatbot focused on sustainable decision support workflows.',
    stack: ['React.js', 'Node.js', 'Ollama'],
    type: 'Conversational AI'
  },
  {
    name: 'AREA',
    context: 'Automation Platform',
    description: 'Developed an automation platform inspired by IFTTT to synchronize actions across services.',
    stack: ['Vue.js', 'Go', 'Gin', 'GORM', 'PostgreSQL', 'OAuth'],
    type: 'Fullstack Platform'
  },
  {
    name: 'R-Type',
    context: 'Game Engine Project',
    description:
      'Engineered a cross-platform game engine and multiplayer R-Type recreation with custom ECS and real-time networking.',
    stack: ['C++', 'Asio', 'ECS', 'Networking'],
    type: 'Game Development'
  }
];

const languages = [
  { name: 'French', level: 'Native' },
  { name: 'English', level: 'B2 - Intermediate' },
  { name: 'German', level: 'B1 - Conversational' }
];

export const portfolioData = {
  profile: {
    name: 'Ylan Cuvier',
    title: 'Developer in Training | Freelance / Self-Employed',
    location: 'Paris, France',
    phone: '+33 6 12 64 63 19',
    email: 'ylan.cuvier@epitech.eu',
    linkedin: 'https://linkedin.com/in/ylan-cuvier',
    summary:
      'Junior fullstack developer currently training at EPITECH, focused on building practical web and mobile products with clean UX and reliable back-end foundations.',
    availability: 'Open to web and mobile development internship opportunities.'
  },
  metrics: [
    { label: 'Years of Experience', value: calculateExperienceYears(experienceStart) },
    { label: 'Projects Shipped', value: `${projects.length}+` },
    { label: 'Working Languages', value: `${languages.length}` }
  ],
  keywords: ['Vue.js', 'Nuxt.js', 'React', 'Node.js', 'Go', 'PHP', 'SQL', 'Docker', 'Tailwind CSS'],
  projects,
  experience: [
    {
      company: 'ISART Digital',
      role: 'Fullstack Web Developer',
      period: 'September 2024 - December 2024',
      location: 'Paris, France',
      bullets: [
        'Redesigned intranet interfaces for corporate relations using PHP and Twig.',
        'Built a modern mobile web interface for student intranet with Vue.js and Nuxt.js connected to PHP services.',
        'Collaborated with technical teams to improve UX and overall system performance.'
      ],
      stack: ['PHP', 'Twig', 'Vue.js', 'Nuxt.js', 'phpMyAdmin', 'SQL']
    }
  ],
  education: [
    {
      institution: 'EPITECH - Le Kremlin-Bicêtre, France',
      degree: 'Master in Computer Science (In Progress)',
      period: '2023 - 2028'
    },
    {
      institution: 'Lycée Claude Monet - Paris',
      degree: 'General Baccalaureate',
      period: '2020 - 2023',
      detail: 'Specialties: Mathematics, Life and Earth Sciences'
    }
  ],
  tools: [
    { name: 'Vue.js', category: 'Frontend Framework' },
    { name: 'Nuxt.js', category: 'Meta Framework' },
    { name: 'React', category: 'Frontend Library' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'Go + Gin', category: 'Backend Stack' },
    { name: 'PHP + Twig', category: 'Web Stack' },
    { name: 'PostgreSQL / SQL', category: 'Database' },
    { name: 'Docker', category: 'DevOps Tooling' },
    { name: 'Git + GitHub', category: 'Collaboration' },
    { name: 'Postman', category: 'API Testing' }
  ],
  thoughts: [
    {
      title: 'What I Learned from Rebuilding an Intranet',
      excerpt:
        'A concise note on balancing legacy constraints with modern component-driven interfaces in a team environment.',
      tag: 'Work Note'
    },
    {
      title: 'Designing Reliable Automation Flows in AREA',
      excerpt:
        'A practical perspective on trigger-action architecture, OAuth integration, and keeping service orchestration debuggable.',
      tag: 'Architecture Note'
    },
    {
      title: 'From Hackathons to Production Thinking',
      excerpt:
        'How fast prototype loops influenced my approach to delivering maintainable fullstack features under constraints.',
      tag: 'Learning Note'
    }
  ],
  contact: {
    budgetOptions: ['<$3k', '$3k - $5k', '$5k - $10k', '>$10k']
  },
  languages,
  interests: ['Climbing', 'Volleyball', 'Hiking']
};
