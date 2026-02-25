const projects = [
  {
    name: '42SH',
    context: 'Systems Programming Project',
    description: 'Recreation of a Linux terminal shell in C.',
    stack: ['C', 'Linux', 'System Programming'],
    type: 'Command-Line Interface'
  },
  {
    name: 'Arcade',
    context: 'Game Platform Project',
    description: 'Cross-platform modular game platform with interchangeable graphical libraries.',
    stack: ['C++', 'OOP', 'SFML', 'Ncurses'],
    type: 'Game Platform'
  },
  {
    name: 'Raytracer',
    context: 'Computer Graphics Project',
    description:
      'Rendering project focused on generating realistic digital images by simulating reverse light paths.',
    stack: ['C++', 'SFML', 'Computer Graphics', 'Mathematics'],
    type: 'Rendering Engine'
  },
  {
    name: 'Area',
    context: 'Automation Platform',
    description:
      'Automation platform with Go (Gin) backend, PostgreSQL, OAuth integrations, and a Swift mobile app.',
    stack: ['Vue.js', 'PostgreSQL', 'Golang', 'Swift', 'Gin', 'OAuth'],
    type: 'Fullstack Platform'
  },
  {
    name: 'Image Compressor',
    context: 'Functional Programming Project',
    description: 'Program to compress images in Haskell on Unix systems.',
    stack: ['Haskell', 'Unix'],
    type: 'Image Processing Tool'
  },
  {
    name: 'ASM MiniLibc',
    context: 'Low-Level Systems Project',
    description: 'Dynamic library implementation in x86-64 assembly language.',
    stack: ['Assembly', 'x86-64', 'System Programming', 'Unix'],
    type: 'Systems Library'
  },
  {
    name: 'My RPG',
    context: 'Game Development Project',
    description: 'RPG game project built with CSFML in C.',
    stack: ['Graphical', 'CSFML', 'C'],
    type: 'RPG Game'
  },
  {
    name: 'Corewar',
    context: 'Virtual Machine Project',
    description:
      'Virtual machine capable of executing programs written in assembly language.',
    stack: ['Unix', 'Assembly', 'Virtual Machine'],
    type: 'Virtual Machine'
  },
  {
    name: 'R-type',
    context: 'Featured Game Project',
    description:
      "2D shoot'em up where a team of 4 spaceships fights enemies in a networked multiplayer setup.",
    stack: ['Graphical', 'Unix', 'Network', 'C++'],
    type: 'Game Development'
  },
  {
    name: 'Gomoku',
    context: 'Featured AI Project',
    description: 'Artificial intelligence project aiming to always win at Gomoku in Python.',
    stack: ['Python', 'AI', 'Algorithms'],
    type: 'AI Strategy Engine'
  },
  {
    name: 'The Plazza',
    context: 'Featured Concurrency Project',
    description: 'Pizzeria simulation and management system using C++ threads and processes.',
    stack: ['C++', 'Threads', 'Processes', 'Unix'],
    type: 'Concurrent Systems'
  },
  {
    name: 'Hackathon ONEPOINT (Podium)',
    context: 'Featured Hackathon Project',
    description: 'Built a website in 5 hours with React and a local Ollama chatbot.',
    stack: ['React', 'Chatbot', 'Ollama'],
    type: 'Rapid Prototype'
  },
  {
    name: 'Zappy',
    context: 'Featured Multiplayer Project',
    description:
      'Multiplayer network game on a toroidal world where teams gather resources and coordinate elevation rituals.',
    stack: ['C++', 'OOP', 'Network', 'Multiplayer'],
    type: 'Network Game'
  },
  {
    name: 'Hackathon VUELING',
    context: 'Featured Hackathon Project',
    description: 'Local AI for real-time translation of in-flight safety instructions.',
    stack: ['AI', 'Translation'],
    type: 'AI Translation Prototype'
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
    { label: 'Years of Experience', value: '3' },
    { label: 'Project', value: '20+' },
    { label: 'Hackathon', value: '5+' }
  ],
  keywords: [
    'PHP',
    'JavaScript',
    'Python',
    'C',
    'C++',
    'Go',
    'SQL',
    'HTML',
    'CSS',
    'Haskell',
    'Assembly',
    'Vue.js',
    'Nuxt.js',
    'React',
    'Node.js',
    'Gin',
    'Twig',
    'Tailwind CSS',
    'Git',
    'GitHub',
    'Docker',
    'Postman',
    'phpMyAdmin',
    'GORM',
    'REST API',
    'OAuth',
    'Object-Oriented Programming',
    'GitHub Copilot',
    'Google Gemini',
    'Codex',
    'ChatGPT',
    'Linux',
    'Bash',
    'Shell scripting'
  ],
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
