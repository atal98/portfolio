export const profile = {
  name: 'Atal Upadhyay',
  role: 'Software Engineer',
  handle: 'atalOS',
  location: 'Mumbai, India',
  email: 'atal.upadhyay98@gmail.com',
  phone: '+91 7984146390',
  github: 'https://github.com/atal98',
  repo: 'https://github.com/atal98/portfolio',
  linkedin: 'https://www.linkedin.com/in/atal-upadhyay/',
  tagline: 'Building backend systems where AI, data, and cloud infrastructure meet.',
  summary:
    'Software Engineer focused on production-grade backend systems, AI workflows, microservices, cloud deployment, and automation-heavy platforms.'
}

export const bootLines = [
  'initializing AtalOS...',
  'loading backend systems...',
  'connecting AI workflows...',
  'syncing cloud infrastructure...',
  'mounting data pipelines...',
  'portfolio ready.'
]

export const statusCards = [
  { label: 'AI Workflows', value: 'Active', detail: 'LLMs, LangChain, OpenAI, Hugging Face' },
  { label: 'Backend APIs', value: 'Production', detail: 'FastAPI, Django, DRF, WebSockets' },
  { label: 'Cloud Infra', value: 'Deployed', detail: 'AWS ECS, Lambda, RDS, S3, CloudFront' },
  { label: 'Data Pipelines', value: 'Automated', detail: 'ETL, public APIs, analytics, dashboards' },
  { label: 'Microservices', value: 'Scalable', detail: 'Docker, Kubernetes, Redis, Temporal' },
  { label: 'System Thinking', value: 'Online', detail: 'Architecture, reliability, workflows' }
]

export const impactStats = [
  { number: '60%', label: 'faster report generation', source: 'AI planning workflows' },
  { number: '40%', label: 'backend throughput improvement', source: 'FastAPI + Redis systems' },
  { number: '35%', label: 'lower session latency', source: 'EV charging async workflows' },
  { number: '99.9%', label: 'uptime target delivered', source: 'AWS ECS microservices' },
  { number: '100+', label: 'tenant databases supported', source: 'multi-tenant SaaS architecture' },
  { number: '60%', label: 'manual processing reduced', source: 'ETL + automation scripts' }
]

export const projects = [
  {
    id: 'bpcl-ev',
    title: 'BPCL-EV Charging Platform',
    type: 'Protocol + Microservices System',
    role: 'Backend / Platform Engineer',
    status: 'Production-grade architecture',
    featured: true,
    tags: ['FastAPI', 'Temporal', 'OCPI 2.2.1', 'Beckn', 'PostgreSQL', 'Redis'],
    impact: 'Reduced session initiation latency by 35% using async workflows and caching.',
    problem:
      'EV charging networks need reliable discovery, tariff sync, order management, and session lifecycle updates across distributed CPO systems.',
    solution:
      'Architected a Beckn-compliant BPP with FastAPI services, Temporal workflows, OCPI integration, Redis caching, and real-time webhook sync.',
    architecture: ['User App', 'Beckn Protocol Layer', 'FastAPI Services', 'Temporal Workflows', 'PostgreSQL + Redis', 'OCPI CPO Layer', 'EV Charging Network'],
    lesson:
      'Protocol-driven systems need strict state handling, async orchestration, and defensive integration design.'
  },
  {
    id: 'planzookie',
    title: 'Planzookie AI Planning Platform',
    type: 'AI + Real-world Data Platform',
    role: 'Backend / AI Workflow Engineer',
    status: 'AI document generation system',
    featured: true,
    tags: ['LangChain', 'OpenAI', 'Datasets', 'Maps', 'Visualizations', 'Python'],
    impact: 'Improved structured report creation efficiency by 60%.',
    problem:
      'Community planning documents require repetitive writing, real-world datasets, mapping, and contextual report sections.',
    solution:
      'Designed backend architecture and LLM workflows to generate structured planning sections using Census, transportation, and parcel datasets.',
    architecture: ['Planning Input', 'Dataset Context', 'LLM Workflow', 'Section Generator', 'Visualization Module', 'Structured Report'],
    lesson:
      'AI output becomes useful only when it is grounded in domain-specific data and validated structure.'
  },
  {
    id: 'audiobook-ai',
    title: 'AI-Powered Audiobook Mobile Platform',
    type: 'AI Experience Platform',
    role: 'Backend Engineer',
    status: '1K+ user support',
    featured: true,
    tags: ['AWS Lambda', 'Whisper APIs', 'AI Voice', 'Subtitles', 'Gamification'],
    impact: 'Reduced AI inference response times by 40%.',
    problem:
      'Audiobook users needed playback, multilingual subtitles, AI-driven voice/text interaction, and engagement features in one platform.',
    solution:
      'Engineered APIs for playback, subtitle generation, voice/text AI interactions, gamification, and analytics dashboards.',
    architecture: ['Mobile App', 'Playback APIs', 'Subtitle Pipeline', 'AI Voice/Text Layer', 'AWS Lambda', 'Analytics Dashboard'],
    lesson:
      'User-facing AI features must balance speed, reliability, and clear product feedback loops.'
  },
  {
    id: 'spotwork',
    title: 'Spotwork Multi-Tenant SaaS Job Board',
    type: 'SaaS Infrastructure',
    role: 'Backend Architect',
    status: '100+ tenant databases',
    featured: true,
    tags: ['Microservices', 'AWS ECS', 'Docker', 'GitLab CI/CD', 'RBAC'],
    impact: 'Supported 100+ isolated tenant databases with 99.9% uptime.',
    problem:
      'A job board platform needed isolated tenant data, role-based access, scalable services, and reliable deployments.',
    solution:
      'Architected multi-tenant backend with isolated databases, RBAC, Dockerized microservices, AWS ECS deployment, and CI/CD pipelines.',
    architecture: ['Tenant Portal', 'Auth + RBAC', 'API Gateway', 'Tenant Resolver', 'Isolated Databases', 'AWS ECS Services'],
    lesson:
      'Multi-tenancy is less about tables and more about trust boundaries, observability, and deployment discipline.'
  },
  {
    id: 'rvin',
    title: 'RVIN Merchant Support AI',
    type: 'AI Support Automation',
    role: 'AI/ML Pipeline Engineer',
    status: 'Multi-channel automation',
    featured: false,
    tags: ['Knowledge Bases', 'WhatsApp', 'Instagram', 'Email', 'AI Pipelines'],
    impact: 'Improved customer query response efficiency by 40%.',
    problem:
      'Merchants received repetitive support queries across several channels and needed faster, context-aware responses.',
    solution:
      'Built AI-powered support workflows using merchant-specific knowledge bases and channel integrations.',
    architecture: ['Customer Channels', 'Message Router', 'Merchant Knowledge Base', 'AI Response Engine', 'Support Dashboard'],
    lesson:
      'Support automation works best when responses are constrained by business-specific knowledge and escalation logic.'
  },
  {
    id: 'ioc-logistics',
    title: 'IOC Shipping & Logistics Platform',
    type: 'Enterprise Logistics System',
    role: 'Software Developer',
    status: 'Real-time vessel tracking',
    featured: false,
    tags: ['Django', 'DRF', 'ETL', 'Third-party APIs', 'Dashboards'],
    impact: 'Reduced manual reporting time by over 40% and maintained 99% data accuracy.',
    problem:
      'Shipping teams needed accurate vessel data, operational visibility, and less manual reporting across departments.',
    solution:
      'Developed ETL scripts, REST APIs, dashboards, and backend modules for real-time vessel tracking and workflow automation.',
    architecture: ['Third-party APIs', 'ETL Scripts', 'Django APIs', 'Operational Database', 'Dashboards', 'Department Users'],
    lesson:
      'Enterprise automation depends on clean data contracts, resilient sync jobs, and simple operational visibility.'
  }
]

export const stackLayers = [
  {
    title: 'AI Layer',
    tools: ['LangChain', 'OpenAI API', 'Hugging Face', 'Whisper APIs', 'LLM Workflows', 'AI/ML Integration']
  },
  {
    title: 'Backend Layer',
    tools: ['Python', 'FastAPI', 'Django', 'Django REST Framework', 'WebSockets', 'Microservices']
  },
  {
    title: 'Data Layer',
    tools: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Pandas', 'GeoPandas', 'ETL Pipelines']
  },
  {
    title: 'Cloud Layer',
    tools: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS Lambda', 'AWS ECS', 'CloudFront', 'Azure Services']
  },
  {
    title: 'DevOps Layer',
    tools: ['Docker', 'Kubernetes', 'GitLab CI/CD', 'Shell Scripting', 'Cron Jobs', 'Agile/Scrum']
  },
  {
    title: 'Workflow Layer',
    tools: ['Temporal', 'Celery', 'Webhooks', 'SMTP', 'Public Data APIs', 'Jira']
  }
]

export const timeline = [
  {
    period: 'Dec 2025 — Apr 2026',
    role: 'Software Engineer Lead',
    company: 'ETIOT Pvt. Ltd.',
    highlight: 'Built Beckn-compliant EV charging backend using FastAPI, Temporal, OCPI, PostgreSQL, and Redis.'
  },
  {
    period: 'Aug 2024 — Nov 2025',
    role: 'Software Engineer',
    company: 'CapitalNumbers Pvt. Ltd.',
    highlight: 'Delivered AI platforms, multi-tenant SaaS systems, cloud microservices, and LLM-powered workflows.'
  },
  {
    period: 'Apr 2024 — Aug 2024',
    role: 'Software Engineer - Freelancer',
    company: 'MSCPL DCGO',
    highlight: 'Built HRMS automation, ETL migration flows, and enterprise backend modules.'
  },
  {
    period: 'Feb 2023 — Mar 2024',
    role: 'Software Developer',
    company: 'ASPL',
    highlight: 'Developed IOC logistics modules, real-time vessel tracking, and ETL-backed dashboards.'
  },
  {
    period: 'Jul 2022 — Dec 2022',
    role: 'Software Developer - Freelancer',
    company: 'Mindframeworks',
    highlight: 'Built logistics, inventory, analytics, and NLP-backed contract analysis systems.'
  }
]
