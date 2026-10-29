export const projectCategories = [
  "Healthcare",
  "AI & Analytics",
  "Enterprise SaaS",
  "Smart Transportation",
  "Finance",
  "Corporate Websites",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  period: string;
  technologies: string[];
  description: string;
  responsibilities: string[];
  categories: ProjectCategory[];
};

export const projects: Project[] = [
  {
    id: "encipher",
    title: "Encipher Healthcare Platform",
    period: "2020–2021",
    technologies: [
      "React.js",
      "JavaScript",
      "Spring Boot",
      "Hibernate",
      "REST APIs",
      "Oracle DB",
    ],
    description:
      "Healthcare modules for patient registration, appointments, doctor management, medical records, reporting, and API integration.",
    responsibilities: [
      "Patient registration and appointment modules",
      "Doctor management and medical records",
      "Reporting and REST API integration",
    ],
    categories: ["Healthcare"],
  },
  {
    id: "innoura",
    title: "Innoura Website",
    period: "2021",
    technologies: ["React.js", "HTML5", "CSS3", "JavaScript", "SEO"],
    description:
      "Responsive corporate website with reusable React components, pixel-perfect UI, accessibility, SEO, and cross-browser support.",
    responsibilities: [
      "Reusable React components and pixel-perfect UI",
      "Accessibility, SEO, and cross-browser support",
    ],
    categories: ["Corporate Websites"],
  },
  {
    id: "alpine",
    title: "Alpine Healthcare Website",
    period: "2021",
    technologies: ["React.js", "JavaScript", "REST APIs"],
    description:
      "Healthcare pages, enquiry forms, appointment requests, dynamic content, and responsive UI.",
    responsibilities: [
      "Healthcare pages and enquiry forms",
      "Appointment requests, dynamic content, and responsive UI",
    ],
    categories: ["Healthcare", "Corporate Websites"],
  },
  {
    id: "visavis",
    title: "VisaVis Medical Application",
    period: "2021–2022",
    technologies: [
      "React.js",
      "TypeScript",
      "Spring Boot",
      "Hibernate",
      "REST APIs",
      "Oracle DB",
    ],
    description:
      "Patient registration, appointments, laboratory reports, prescriptions, doctor consultation, and medical workflows.",
    responsibilities: [
      "Patient registration and appointments",
      "Laboratory reports, prescriptions, and doctor consultation",
      "Medical workflow implementation",
    ],
    categories: ["Healthcare"],
  },
  {
    id: "247medical",
    title: "247Medical Website",
    period: "2022",
    technologies: ["React.js", "JavaScript", "AWS EC2", "Hostinger", "REST APIs"],
    description:
      "Responsive healthcare modules and production deployment.",
    responsibilities: [
      "Responsive healthcare modules",
      "Production deployment on AWS EC2 and Hostinger",
    ],
    categories: ["Healthcare", "Corporate Websites"],
  },
  {
    id: "g3",
    title: "G3 Cyberspace Website",
    period: "2022",
    technologies: ["React.js", "JavaScript", "REST APIs"],
    description:
      "Cybersecurity service pages, enquiry features, reusable components, and frontend performance improvements.",
    responsibilities: [
      "Cybersecurity service pages and enquiry features",
      "Reusable components and frontend performance improvements",
    ],
    categories: ["Corporate Websites"],
  },
  {
    id: "cogent",
    title: "Cogent AI Application",
    period: "2022–2023",
    technologies: [
      "React.js",
      "TypeScript",
      "Spring Boot",
      "Hibernate",
      "MongoDB",
      "ECharts",
    ],
    description:
      "AI dashboards, analytics, charts, filters, reporting, and reusable visualization components.",
    responsibilities: [
      "AI dashboards, analytics, and charts",
      "Filters, reporting, and reusable visualization components",
    ],
    categories: ["AI & Analytics"],
  },
  {
    id: "controlzen",
    title: "ControlZen Application",
    period: "2023",
    technologies: ["React.js", "TypeScript", "Spring Boot", "REST APIs"],
    description:
      "Authentication, role-based access control, approvals, dashboards, notifications, and user administration.",
    responsibilities: [
      "Authentication and role-based access control",
      "Approvals, dashboards, notifications, and user administration",
    ],
    categories: ["Enterprise SaaS"],
  },
  {
    id: "toss",
    title: "TOSS Application — Croma",
    period: "2023–2024",
    technologies: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Spring Boot",
      "Hibernate",
    ],
    description:
      "Financial planning, eligibility, investment, loan management, onboarding, approvals, and transaction workflows.",
    responsibilities: [
      "Financial planning, eligibility, and investment workflows",
      "Loan management, onboarding, approvals, and transactions",
    ],
    categories: ["Finance"],
  },
  {
    id: "plato",
    title: "PLATO Enterprise Project Management Platform",
    period: "2024–Present",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "Hibernate",
      "MongoDB",
    ],
    description:
      "Task management, sprint planning, resource allocation, dashboards, reporting, approvals, notifications, and user management.",
    responsibilities: [
      "Task management, sprint planning, and resource allocation",
      "Dashboards, reporting, approvals, notifications, and user management",
    ],
    categories: ["Enterprise SaaS"],
  },
  {
    id: "anpr",
    title: "ANPR Vehicle Monitoring Platform",
    period: "2025",
    technologies: ["React.js", "Spring Boot", "Hibernate", "REST APIs", "ECharts"],
    description:
      "Vehicle monitoring dashboards, camera integration, vehicle history, alerts, reports, and analytics.",
    responsibilities: [
      "Vehicle monitoring dashboards and camera integration",
      "Vehicle history, alerts, reports, and analytics",
    ],
    categories: ["Smart Transportation"],
  },
  {
    id: "builder",
    title: "Builder Application",
    period: "2025",
    technologies: ["React.js", "TypeScript", "Spring Boot", "REST APIs"],
    description:
      "Onboarding, eligibility, planning, budget estimation, document management, approvals, and dynamic calculations.",
    responsibilities: [
      "Onboarding, eligibility, planning, and budget estimation",
      "Document management, approvals, and dynamic calculations",
    ],
    categories: ["Enterprise SaaS"],
  },
  {
    id: "traqops-cmrl",
    title: "TraqOps — CMRL Metro",
    period: "2025",
    technologies: ["React.js", "TypeScript", "Spring Boot", "REST APIs"],
    description:
      "Asset management, inspections, maintenance scheduling, incident tracking, dashboards, reports, and approvals.",
    responsibilities: [
      "Asset management, inspections, and maintenance scheduling",
      "Incident tracking, dashboards, reports, and approvals",
    ],
    categories: ["Smart Transportation"],
  },
  {
    id: "traqops-bmrl",
    title: "TraqOps — BMRL Metro",
    period: "2025–2026",
    technologies: ["React.js", "TypeScript", "Spring Boot", "REST APIs"],
    description:
      "Asset management, inspection, maintenance, reporting, dashboards, notifications, workflow automation, and release activities.",
    responsibilities: [
      "Asset management, inspection, and maintenance",
      "Reporting, dashboards, notifications, and workflow automation",
      "Release activities",
    ],
    categories: ["Smart Transportation"],
  },
  {
    id: "mirador",
    title: "Mirador AI Video Analytics Platform",
    period: "2026",
    technologies: [
      "React.js",
      "TypeScript",
      "Spring Boot",
      "AI APIs",
      "ECharts",
    ],
    description:
      "AI-powered video analytics dashboards for live monitoring, incident detection, camera management, event logs, and reporting.",
    responsibilities: [
      "Live monitoring and incident detection dashboards",
      "Camera management, event logs, and reporting",
    ],
    categories: ["AI & Analytics"],
  },
  {
    id: "twilio",
    title: "Twilio AI Voice Calling Platform",
    period: "2026",
    technologies: [
      "React.js",
      "Node.js",
      "Spring Boot",
      "Twilio APIs",
      "Webhooks",
    ],
    description:
      "AI voice calling dashboards, call history, analytics, agent monitoring, notifications, reporting, and backend integration.",
    responsibilities: [
      "AI voice calling dashboards, call history, and analytics",
      "Agent monitoring, notifications, reporting, and backend integration",
    ],
    categories: ["AI & Analytics"],
  },
  {
    id: "beetloop",
    title: "Beetloop Product Development Platform",
    period: "2026–Present",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "Hibernate",
      "RTK Query",
      "Oracle DB",
    ],
    description:
      "Buyer and vendor onboarding, RFQ, inventory, products and services, project management, document management, role-based access control, approval workflows, dashboards, and REST API integrations.",
    responsibilities: [
      "Buyer and vendor onboarding, RFQ, inventory, and catalog workflows",
      "Project and document management with RBAC and approvals",
      "Dashboards and REST API integrations",
    ],
    categories: ["Enterprise SaaS"],
  },
];
