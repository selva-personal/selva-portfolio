export type SkillCategory = {
  id: string;
  title: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "JavaScript ES6+",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Ant Design",
      "Material UI",
      "Redux Toolkit",
      "RTK Query",
      "React Hooks",
      "Context API",
      "React Router",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      "Java 17",
      "Spring Boot",
      "Hibernate/JPA",
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "RBAC",
      "Microservices",
      "Webhooks",
    ],
  },
  {
    id: "databases",
    title: "Databases",
    items: ["Oracle", "MongoDB", "MySQL", "PostgreSQL", "SQL", "JSON"],
  },
  {
    id: "quality",
    title: "Testing and Quality",
    items: [
      "Unit Testing",
      "JUnit",
      "Mockito",
      "SonarQube",
      "Code Quality Analysis",
      "Code Review",
    ],
  },
  {
    id: "devops",
    title: "DevOps and Tools",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Jenkins",
      "CI/CD",
      "AWS EC2",
      "Hostinger",
      "Docker Basics",
      "Maven",
      "IntelliJ IDEA",
      "VS Code",
      "Postman",
      "Swagger UI",
      "Vite",
      "npm",
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    items: [
      "Agile Scrum",
      "SDLC",
      "Performance Optimization",
      "Code Splitting",
      "Lazy Loading",
      "API Troubleshooting",
      "Production Support",
      "Build Management",
      "Deployment",
    ],
  },
];
