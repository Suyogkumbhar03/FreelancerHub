export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'E-Commerce Website Redesign & Migration to Next.js 14',
    category: 'Web & Software Dev',
    badge: 'Urgent',
    badgeType: 'urgent',
    postedTime: '10 minutes ago',
    budget: '$2,500 – $3,500',
    minBudget: 2500,
    maxBudget: 3500,
    type: 'Fixed-Price • Milestone Based',
    engagement: 'Fixed-Price',
    escrow: true,
    description: 'Seeking a senior full-stack engineer to refactor our current legacy storefront into Next.js 14 with App Router, Tailwind CSS, and headless Shopify Storefront API. Scope includes high-speed caching optimization, Cart and Checkout webhooks via Stripe, and full responsive pixel fidelity against existing Figma components. Must be experienced with modern SSR hydration patterns.',
    tags: ['Next.js 14', 'Tailwind CSS', 'Shopify API', 'Stripe Checkout', 'TypeScript'],
    client: {
      name: 'Apex Branch',
      verified: true,
      rating: 5.0,
      spent: '$120k+ spent',
      location: 'United States',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    },
    proposalsCount: 6,
    deadline: '14 days remaining',
    experience: 'Expert',
    saved: false
  },
  {
    id: 'proj-2',
    title: 'AI Conversational Chatbot Integration with RAG Pipeline',
    category: 'AI & Machine Learning',
    badge: 'Featured Job',
    badgeType: 'featured',
    postedTime: '1 hour ago',
    budget: '$1,800',
    minBudget: 1800,
    maxBudget: 1800,
    type: 'Fixed-Price • Funded Escrow',
    engagement: 'Fixed-Price',
    escrow: true,
    description: 'Architect an end-to-end Retrieval-Augmented Generation (RAG) assistant indexing 15,000 internal enterprise PDFs. We need an experienced Python developer proficient with LangChain/LlamaIndex, OpenAI embeddings, and Pinecone vector database. Solution includes secure REST API microservice containerized on AWS ECS.',
    tags: ['Python 3.11', 'LangChain', 'OpenAI API', 'Pinecone', 'FastAPI'],
    client: {
      name: 'DataPulse Labs',
      verified: true,
      topClient: true,
      rating: 4.9,
      spent: '$85k+ spent',
      location: 'Canada',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    proposalsCount: 12,
    deadline: '7 days remaining',
    experience: 'Intermediate',
    saved: true
  },
  {
    id: 'proj-3',
    title: 'Fintech Mobile App UI/UX Design System in Figma',
    category: 'UI/UX & Product Design',
    badge: 'High Value',
    badgeType: 'high-value',
    postedTime: '3 hours ago',
    budget: '$3,200',
    minBudget: 3200,
    maxBudget: 3200,
    type: 'Fixed-Price • 3 Milestones',
    engagement: 'Fixed-Price',
    escrow: true,
    description: 'NovaPay is designing its flagship consumer mobile neo-banking app (iOS and Android). We require a Figma system specialist who creates production-ready design tokens, light/dark component variants, auto-layout 5.0 interactive states, and clean handoff specs for React Native engineers.',
    tags: ['Figma Variables', 'iOS Design', 'Design Tokens', 'Micro-interactions'],
    client: {
      name: 'NovaPay Financial',
      verified: true,
      rating: 5.0,
      spent: '$210k+ spent',
      location: 'United Kingdom',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    proposalsCount: 9,
    deadline: '20 days remaining',
    experience: 'Expert',
    saved: false
  },
  {
    id: 'proj-4',
    title: 'B2B SaaS Content Strategy & Technical Documentation',
    category: 'Growth & Technical Writing',
    badge: 'Content & Docs',
    badgeType: 'content',
    postedTime: '4 hours ago',
    budget: '$850',
    minBudget: 850,
    maxBudget: 850,
    type: 'Escrow Funded',
    engagement: 'Fixed-Price',
    escrow: true,
    description: 'Looking for a technical copywriter and developer advocate to write five in-depth architectural guides for our developer documentation portal (Mintlify). Topics cover OAuth2 setup, WebSocket streaming event listeners, and GraphQL rate limits. Sample articles required.',
    tags: ['Technical Writing', 'API Documentation', 'Developer Relations', 'Markdown'],
    client: {
      name: 'CloudPeak Networks',
      verified: true,
      rating: 4.9,
      spent: '$42k+ spent',
      location: 'Germany',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    proposalsCount: 4,
    deadline: '10 days remaining',
    experience: 'Intermediate',
    saved: true
  },
  {
    id: 'proj-5',
    title: 'Full-Stack WebGL 3D Interactive Landing Page',
    category: 'Web & Software Dev',
    badge: 'Creative Coding',
    badgeType: 'creative',
    postedTime: '5 hours ago',
    budget: '$4,500',
    minBudget: 4500,
    maxBudget: 4500,
    type: 'Fixed-Price • Verified Escrow',
    engagement: 'Fixed-Price',
    escrow: true,
    description: 'Build an immersive 3D product showcase for a high-performance electric hypercar launch. We have GLTF 3D assets ready; you will construct interactive shaders, camera orbit transitions on scroll (GSAP ScrollTrigger), and post-processing bloom via Three.js or React Three Fiber with zero stuttering.',
    tags: ['Three.js', 'WebGL Shaders', 'React Three Fiber', 'GSAP', 'Performance Tuning'],
    client: {
      name: 'Veloce Studio',
      verified: true,
      rating: 5.0,
      spent: '$340k+ spent',
      location: 'Switzerland',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    proposalsCount: 8,
    deadline: '11 days remaining',
    experience: 'Expert',
    saved: false
  },
  {
    id: 'proj-6',
    title: 'Next.js & Stripe Recurring Billing System',
    category: 'Web & Software Dev',
    badge: 'Long-term',
    badgeType: 'featured',
    postedTime: '6 hours ago',
    budget: '$75 – $95 / hr',
    minBudget: 75,
    maxBudget: 95,
    type: 'Hourly Rate',
    engagement: 'Hourly Rate',
    escrow: true,
    description: 'Looking for a cloud billing engineer to set up usage-based metering billing via Stripe Customer Portal, webhook resilience, and multi-currency tax readiness.',
    tags: ['Direct Billing', 'Next.js', 'TypeScript', 'PostgreSQL'],
    client: {
      name: 'Aura Studio',
      verified: true,
      rating: 4.8,
      spent: '$95k+ spent',
      location: 'USA',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    },
    proposalsCount: 5,
    deadline: '15 days remaining',
    experience: 'Expert',
    saved: false
  }
];

export const INITIAL_FREELANCERS = [
  {
    id: 'tal-1',
    name: 'Pratik',
    role: 'Fullstack Web Developer',
    verified: true,
    tier: 'Top Rated',
    tierBadge: 'top-rated',
    hourlyRate: 50,
    successScore: 100,
    rating: 5.0,
    reviews: 48,
    totalEarned: '$45k+',
    hoursLogged: '820 hrs Completed Work',
    location: 'Mumbai, India',
    availability: 'Available Now',
    specialization: 'Fullstack Development',
    bio: 'Passionate web developer experienced in building fast React websites, Node.js APIs, and clean responsive web applications on time.',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'CSS'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'tal-2',
    name: 'Marcus Chen',
    role: 'Principal Product & UI/UX Designer',
    verified: true,
    tier: 'Top Rated',
    tierBadge: 'top-rated',
    hourlyRate: 75,
    successScore: 100,
    rating: 5.0,
    reviews: 124,
    totalEarned: '$195k+',
    hoursLogged: '32 Systems Published',
    location: 'Vancouver, CA (PST)',
    availability: 'Available Now',
    specialization: 'Product & UI/UX',
    bio: 'Specialized in multi-tier enterprise design systems, complex fintech dashboards, SaaS ergonomics, and end-to-end user journeys.',
    skills: ['Figma', 'Design Systems', 'Wireframing', 'Webflow', 'Design Tokens'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'tal-3',
    name: 'Sophia Al-Mansoor',
    role: 'AI & ML Solutions Architect',
    verified: true,
    tier: 'Expert Vetted',
    tierBadge: 'expert-vetted',
    hourlyRate: 95,
    successScore: 98,
    rating: 4.9,
    reviews: 42,
    totalEarned: '$160k+',
    hoursLogged: '18 Models Deployed',
    location: 'London, UK (GMT)',
    availability: 'Available Now',
    specialization: 'AI & Machine Learning',
    bio: 'Pioneering RAG pipelines, fine-tuned transformer architectures, and vector embeddings at scale. Built low-latency agentic workflows.',
    skills: ['LLMs', 'RAG', 'PyTorch', 'FastAPI', 'LangChain'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'tal-4',
    name: 'Aria Patel',
    role: 'Mobile App Developer (Flutter & Swift)',
    verified: true,
    tier: 'Top Rated',
    tierBadge: 'top-rated',
    hourlyRate: 70,
    successScore: 99,
    rating: 4.9,
    reviews: 53,
    totalEarned: '$115k+',
    hoursLogged: '24 Apps on Store',
    location: 'Austin, TX (CST)',
    availability: 'Available Now',
    specialization: 'Mobile Engineering',
    bio: 'Cross-platform native enthusiast building fluid 60fps mobile journeys. Deep expertise in Bluetooth BLE sync, offline caching, and payment SDKs.',
    skills: ['Flutter', 'Swift', 'React Native', 'Firebase', 'Kotlin'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'tal-5',
    name: 'David Miller',
    role: 'Technical Content Strategist & DevRel Docs',
    verified: true,
    tier: 'Top Rated',
    tierBadge: 'top-rated',
    hourlyRate: 50,
    successScore: 97,
    rating: 4.8,
    reviews: 65,
    totalEarned: '$88k+',
    hoursLogged: '140+ Guides Authored',
    location: 'Denver, CO (MST)',
    availability: 'Available Now',
    specialization: 'Technical Writing & DevRel',
    bio: 'Bridging engineering and product adoption through pristine API documentation, OpenAPI specs, interactive guides, and tech blog posts.',
    skills: ['Developer Docs', 'API Guides', 'SEO', 'Swagger', 'GitBook'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80'
  },
  {
    id: 'tal-6',
    name: 'Julianna Vance',
    role: 'DevOps & Kubernetes Engineer',
    verified: true,
    tier: 'Expert Vetted',
    tierBadge: 'expert-vetted',
    hourlyRate: 110,
    successScore: 100,
    rating: 5.0,
    reviews: 31,
    totalEarned: '$280k+',
    hoursLogged: '99.99% Uptime Target',
    location: 'Zurich, CH (CET)',
    availability: 'Available Now',
    specialization: 'DevOps & Cloud Infra',
    bio: 'Enterprise Kubernetes architect handling multi-region cluster topologies, GitOps pipelines via ArgoCD, zero-downtime deployments, and terraform modules.',
    skills: ['CI/CD', 'Terraform', 'Kubernetes', 'GCP', 'Docker'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&auto=format&fit=crop&q=80'
  }
];

export const SPECIALIZATION_CATEGORIES = [
  {
    id: 'cat-1',
    title: 'Fullstack & Web Development',
    vettedCount: '3,420+ Vetted',
    description: 'React, Next.js, Node.js, Python, TypeScript, scalable backend and modern headless architecture.',
    avgRate: 'Avg. $75-120/hr',
    responseTime: '< 2h response time',
    iconName: 'Code'
  },
  {
    id: 'cat-2',
    title: 'UI/UX & Product Design',
    vettedCount: '1,840+ Vetted',
    description: 'Design systems, Figma prototypes, mobile UX audits, high-converting web applications.',
    avgRate: 'Avg. $65-110/hr',
    responseTime: '< 1h response time',
    iconName: 'Layout'
  },
  {
    id: 'cat-3',
    title: 'AI & Machine Learning',
    vettedCount: '920+ Vetted',
    description: 'LangChain, Retrieval Pipelines, agent orchestration, PyTorch models, and Custom Fine-Tuning pipelines.',
    avgRate: 'Avg. $95-160/hr',
    responseTime: '< 1h response time',
    iconName: 'Cpu'
  },
  {
    id: 'cat-4',
    title: 'Mobile App Development',
    vettedCount: '2,150+ Vetted',
    description: 'Flutter, React Native, Swift (iOS), Kotlin (Android), cross-platform architecture and offline-first apps.',
    avgRate: 'Avg. $70-115/hr',
    responseTime: '< 3h response time',
    iconName: 'Smartphone'
  },
  {
    id: 'cat-5',
    title: 'SEO & Growth Marketing',
    vettedCount: '1,420+ Vetted',
    description: 'Technical aspect search optimization, programmatic page generation, and conversion rate optimization.',
    avgRate: 'Avg. $55-90/hr',
    responseTime: '< 1h response time',
    iconName: 'TrendingUp'
  },
  {
    id: 'cat-6',
    title: 'Cloud, DevOps & Security',
    vettedCount: '890+ Vetted',
    description: 'AWS architectures, Kubernetes infrastructure, CI/CD pipelines, Documentation, SOC2 compliance.',
    avgRate: 'Avg. $85-140/hr',
    responseTime: '< 1h response time',
    iconName: 'Cloud'
  }
];

export const USER_DASHBOARD_DATA = {
  name: 'Alex Morgan',
  role: 'Verified Pro',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  totalEarnings: '$12,450.00',
  earningsGrowth: '+18% vs last mo',
  jobSuccessScore: 98,
  reviewsCount: 32,
  activeContractsCount: 3,
  pipelineValue: '$10,100.00',
  inEscrowValue: '$2,400.00',
  proposalsSubmittedCount: 8,
  inReviewCount: 3,
  interviewingCount: 2,
  availablePayout: '$4,820.00',
  ongoingDeliverables: [
    {
      id: 'deliv-1',
      title: 'NovaPay Design System',
      milestone: 'Milestone 3 of 4',
      client: 'NovaPay Financial Inc.',
      totalValue: '$4,500.00',
      escrowProtected: '$1,500.00',
      progress: 75,
      sprintDelivery: 'High-fidelity Design Tokens & Figma Components',
      dueDate: 'Due in 3 days (Oct 28)',
      filesUploaded: '4 Files Uploaded'
    },
    {
      id: 'deliv-2',
      title: 'Chrono Task Architecture',
      milestone: 'Milestone 1 of 3',
      client: 'Chrono Labs GmbH',
      totalValue: '$2,800.00',
      escrowProtected: '$900.00',
      progress: 40,
      sprintDelivery: 'Core Database Schema & Prisma Migrations',
      dueDate: 'Due Nov 06, 2024',
      filesUploaded: 'Client sync today at 3 PM'
    }
  ],
  recentProposals: [
    {
      id: 'prop-1',
      role: 'Fintech Mobile App Redesign',
      client: 'Aura Digital Studio',
      bidAmount: '$5,200.00',
      submittedDate: 'Oct 22, 2024',
      status: 'Interviewing'
    },
    {
      id: 'prop-2',
      role: 'Next.js Cloud Analytics Dashboard',
      client: 'MetricBase Inc.',
      bidAmount: '$3,600.00',
      submittedDate: 'Oct 20, 2024',
      status: 'Pending Review'
    },
    {
      id: 'prop-3',
      role: 'AI Content Engine Microservices',
      client: 'Synthetix AI',
      bidAmount: '$7,800.00',
      submittedDate: 'Oct 16, 2024',
      status: 'Offer Extended'
    },
    {
      id: 'prop-4',
      role: 'SaaS Brand Identity & Webflow System',
      client: 'Kinetic Studio',
      bidAmount: '$4,000.00',
      submittedDate: 'Oct 12, 2024',
      status: 'Interviewing'
    }
  ],
  upcomingSyncs: [
    {
      id: 'sync-1',
      dateDay: '24',
      dateLabel: 'TODAY',
      title: 'NovaPay Milestone Review',
      time: '3:00 PM - 3:30 PM EDT'
    },
    {
      id: 'sync-2',
      dateDay: '25',
      dateLabel: 'FRI',
      title: 'Aura Studio Technical Sync',
      time: '11:00 AM - 11:45 AM EDT'
    }
  ]
};

export const NOTIFICATIONS_DATA = [
  { id: 'notif-1', title: 'Payment Released', message: 'Suyog released payment for completed project ($1,000.00 in wallet)', time: '10m ago', unread: true },
  { id: 'notif-2', title: 'New Message from Suyog', message: '“Can you check the web development work?”', time: '1h ago', unread: true },
  { id: 'notif-3', title: 'Job Application Viewed', message: 'Client viewed your application for web app', time: '3h ago', unread: false },
  { id: 'notif-4', title: 'Payment Protected', message: '$1,500.00 safely held for your active job', time: '1d ago', unread: false }
];

export const INITIAL_TALENT = INITIAL_FREELANCERS;
export const INITIAL_NOTIFICATIONS = NOTIFICATIONS_DATA;
