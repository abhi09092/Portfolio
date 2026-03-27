export const featuredProjects = [
  {
    id: "project-1",
    title: "AI Code Assistant",
    description: "An AI-powered terminal application that helps developers write code, catch bugs, and refactor architecture.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    techStack: ["React", "TypeScript", "Node.js", "OpenAI"],
    link: "/project/ai-code-assistant"
  },
  {
    id: "project-2",
    title: "Fintech Dashboard",
    description: "A real-time financial tracking dashboard with predictive analytics and rich data visualizations.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    techStack: ["Next.js", "Tailwind CSS", "D3.js", "PostgreSQL"],
    link: "/project/fintech-dashboard"
  },
  {
    id: "project-3",
    title: "E-Commerce Platform",
    description: "A modern highly scalable e-commerce storefront with a headless CMS integration.",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    techStack: ["Vue.js", "Nuxt", "Stripe", "Sanity"],
    link: "/project/ecommerce-platform"
  },
  {
    id: "project-4",
    title: "E-Commerce Platform",
    description: "A modern highly scalable e-commerce storefront with a headless CMS integration.",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    techStack: ["Vue.js", "Nuxt", "Stripe", "Sanity"],
    link: "/project/ecommerce-platform"
  },
  {
    id: "project-5",
    title: "E-Commerce Platform",
    description: "A modern highly scalable e-commerce storefront with a headless CMS integration.",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    techStack: ["Vue.js", "Nuxt", "Stripe", "Sanity"],
    link: "/project/ecommerce-platform"
  },
  {
    id: "project-6",
    title: "E-Commerce Platform",
    description: "A modern highly scalable e-commerce storefront with a headless CMS integration.",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop",
    techStack: ["Vue.js", "Nuxt", "Stripe", "Sanity"],
    link: "/project/ecommerce-platform"
  }
];

export const allProjects = [
  ...featuredProjects,
  {
    id: "project-7",
    title: "Social Media Scheduler",
    description: "Automate and schedule posts across all major social networks from one dashboard.",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    techStack: ["React", "Express", "MongoDB", "Redis"],
    link: "/project/social-scheduler"
  },
  {
    id: "project-8",
    title: "Healthcare Portal",
    description: "A secure patient management portal allowing doctors to track history, prescribe, and schedule.",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    techStack: ["Angular", "Spring Boot", "MySQL", "AWS HIPAA"],
    link: "/project/healthcare-portal"
  },
  {
    id: "project-9",
    title: "Crypto Wallet App",
    description: "A secure non-custodial crypto wallet supporting multi-chain token swaps.",
    thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1200&auto=format&fit=crop",
    techStack: ["React Native", "Solidity", "Ethers.js"],
    link: "/project/crypto-wallet"
  }
];

export const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"] },
  { category: "DevOps & Tools", items: ["Git", "Docker", "AWS", "CI/CD", "Vercel", "Figma"] }
];

export const experience = [
  {
    company: "TechNova Solutions",
    role: "Senior Full Stack Engineer",
    period: "2023 - Present",
    description: "Leading the development of a suite of AI-integrated enterprise tools. Mentoring junior developers and improving CI/CD pipelines.",
  },
  {
    company: "Creative Web Agency",
    role: "Frontend Developer",
    period: "2020 - 2023",
    description: "Built performant, award-winning marketing websites and e-commerce platforms using modern JavaScript frameworks.",
  },
  {
    company: "Startup Inc",
    role: "Junior Software Engineer",
    period: "2018 - 2020",
    description: "Developed internal dashboards and automated daily reporting scripts to save the ops team 15 hours a week.",
  }
];

export const achievements = [
  {
    title: "Global AI Hackathon",
    metric: "1st Place",
    description: "Won first place out of 500+ teams by building a real-time AI code assistant."
  },
  {
    title: "Open Source",
    metric: "1M+ DLs",
    description: "Maintained and contributed to libraries used by thousands of developers globally."
  },
  {
    title: "Platform Growth",
    metric: "400%",
    description: "Led the engineering team to scale product infrastructure from 10k to 50k users."
  }
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    platform: "Amazon Web Services",
    date: "March 2024",
    link: "#"
  },
  {
    name: "Google Cloud Professional Engineer",
    platform: "Google Cloud",
    date: "November 2023",
    link: "#"
  },
  {
    name: "Meta Front-End Developer",
    platform: "Coursera",
    date: "June 2022",
    link: "#"
  }
];

export const faqItems = [
  {
    id: "faq-1",
    question: "What is your primary tech stack?",
    answer: "I specialize in the T3 stack (Next.js, TypeScript, Tailwind CSS) with a strong focus on high-performance React applications. On the backend, I typically use Node.js with PostgreSQL or MongoDB.",
    difficulty: "Easy",
    acceptance: "98.2%",
    status: "Solved",
    category: "Technical"
  },
  {
    id: "faq-2",
    question: "How do you handle complex state management in large React apps?",
    answer: "I prefer a pragmatic approach. I start with React Context for global UI state. For complex server-state, I use TanStack Query. If the client-side logic becomes truly intricate, only then do I reach for Zustand or Redux Toolkit.",
    difficulty: "Medium",
    acceptance: "85.4%",
    status: "Solved",
    category: "Technical"
  },
  {
    id: "faq-3",
    question: "What is your approach to mentorship and team lead roles?",
    answer: "I believe in 'extreme ownership' and servant leadership. My goal is to unblock my team, provide clear architectural guidance, and foster a culture of continuous learning through thorough but empathetic code reviews.",
    difficulty: "Hard",
    acceptance: "72.1%",
    status: "Solved",
    category: "Career"
  },
  {
    id: "faq-4",
    question: "How do you stay updated with rapidly changing technologies?",
    answer: "I follow a 'Just-In-Time' learning philosophy. I keep an eye on RFCs, attend key conferences like Next.js Conf, and build small proof-of-concept projects to evaluate new tools before recommending them.",
    difficulty: "Medium",
    acceptance: "91.8%",
    status: "Todo",
    category: "Personal"
  },
  {
    id: "faq-5",
    question: "What are your long-term career goals?",
    answer: "I aim to transition into a Staff Engineer or Architectural role where I can define the technical vision for large-scale systems while still staying close to the code and contributing to the open-source community.",
    difficulty: "Easy",
    acceptance: "95.0%",
    status: "Solved",
    category: "Career"
  }
];
