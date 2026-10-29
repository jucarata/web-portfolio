export const profile = {
  name: "Juan Camilo Ramirez Tabares",
  given: "Juan Camilo",
  family: "Ramirez Tabares",
  username: "Jucarata",
  role: "Software Engineer",
  location: "Cali, Colombia",
  email: "juancaram21@gmail.com",
  description:
    "Jucarata. Software Engineer in backend, AI, and data engineering. Based in Cali, Colombia.",
  line: "I build backend systems, data models, and AI agents, and connect them to the services around them.",
};

/** First month of practice: March 2025. Years are the completed anniversaries, shown as n+. */
export const experienceStart = { year: 2025, month: 2 } as const;

export function experienceYears(now = new Date()) {
  let years = now.getFullYear() - experienceStart.year;
  if (now.getMonth() < experienceStart.month) years -= 1;
  return Math.max(0, years);
}

export const nav = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;

export const skills = [
  {
    tone: "red",
    title: "Languages and backend",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "FastAPI",
      "Node.js",
      "Spring Boot",
      "Spring Security",
      "Spring Cloud Gateway",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "Apache Tomcat",
    ],
  },
  {
    tone: "blue",
    title: "Architecture and data",
    items: [
      "Microservices",
      "System design",
      "Relational modeling",
      "NoSQL",
      "Dimensional modeling",
      "Redis",
      "Event management",
      "ETL",
      "Asynchronous systems",
    ],
  },
  {
    tone: "yellow",
    title: "Applied AI",
    items: [
      "LangChain",
      "LangGraph",
      "AI agents",
      "RAG",
      "ReAct",
      "Function calling",
      "Tool calling",
      "LLM integration",
    ],
  },
  {
    tone: "ink",
    title: "Cloud and DevOps",
    items: [
      "Google Cloud Platform",
      "Cloud Run",
      "Pub/Sub",
      "Cloud Storage",
      "Firestore",
      "Docker",
      "NGINX",
      "Keycloak",
      "GitHub Actions",
      "CI/CD",
      "On-premises infrastructure",
    ],
  },
] as const;

export const languages = [{ name: "English", level: "Intermediate (B1)" }] as const;

export const projects = [
  {
    tone: "red",
    title: "Architecture",
    text: "Reserved for a real system design. The problem, the structure, and the result are not written yet.",
  },
  {
    tone: "blue",
    title: "Backend",
    text: "Reserved for a real service or platform. Scope and outcome are not written yet.",
  },
  {
    tone: "yellow",
    title: "Artificial intelligence",
    text: "Reserved for a real applied-intelligence build. What it does is not written yet.",
  },
  {
    tone: "ink",
    title: "Systems integration",
    text: "Reserved for a real integration. The systems involved are not written yet.",
  },
] as const;

export const experience = [
  {
    title: "Full-Stack Developer",
    org: "Procytec S.A.S",
    detail: "Part time",
    when: "March 2025 – Present",
    summary:
      "Designing and implementing software solutions, with the primary focus on backend development, business logic, and system architecture. Primarily Spring Boot and relational databases, with frontend work in React. Also microservices on on-premises infrastructure: service boundaries, authentication and authorization, and distributed communication and synchronization.",
    points: [
      "Designed and implemented the integration architecture for a system of two microservices using Spring Cloud Gateway, with static service discovery for the on-premises environment and authentication (AuthN) separated from authorization (AuthZ). A distributed permission cache in Redis uses Pub/Sub to propagate changes and invalidation across services, and the Outbox pattern to publish events for permission updates and revocations.",
      "Designed and implemented the data model and business logic that turned processes previously managed in Excel into a relational structure for the lifecycle of technological assets, including registration, assignment, return, and report generation.",
      "Implemented and deployed the solution on on-premises infrastructure, managing Java services with Apache Tomcat and Node.js processes with PM2, and configuring, updating, and maintaining the platform via SSH.",
    ],
  },
  {
    title: "Backend and AI Engineer",
    org: "Derecho al Derecho",
    when: "June 2025 – August 2026",
    summary:
      "Designing and implementing backend and artificial intelligence solutions, with particular focus on conversational agent architecture and process automation. Agents built with LangChain and LangGraph, using ReAct, function calling, tool calling, and RAG. Also relational, non-relational, and dimensional data models, and integration and deployment on Google Cloud Platform.",
    points: [
      "Designed and implemented a conversational agent for the hospitality industry to manage room reservations, restaurant services, and housekeeping requests, combining ReAct and RAG to coordinate reasoning, retrieval, and action through specialized tools. The system integrated Google Cloud Storage, Google Calendar, and email notifications.",
      "Developed functional AI agent prototypes for the legal, tourism, and education sectors, using ReAct and RAG and integrating them with external services through APIs and tools, including Google Drive, cloud storage, calendars, email, and file and document processing.",
      "Designed and implemented a dimensional data model for analytics and reporting on a platform for the Cali Municipal Government, addressing a previously unresolved technical challenge.",
      "Designed and implemented a federated authentication system using Keycloak, integrating an external identity provider through REST services.",
      "Migrated a system's infrastructure from a serverless architecture on Google Cloud Platform to virtual machines using Docker, configuring NGINX for exposure and routing and automating deployments through GitHub Actions.",
    ],
  },
] as const;

export const education = [
  {
    title: "Software Systems Engineer",
    org: "Universidad ICESI",
    when: "March 2026",
  },
] as const;

export const channels = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jucarata",
    handle: "jucarata",
    tone: "blue",
    external: true,
  },
  {
    name: "Gmail",
    href: `mailto:${profile.email}`,
    handle: profile.email,
    tone: "yellow",
    external: false,
  },
  {
    name: "GitHub",
    href: "https://github.com/jucarata",
    handle: "jucarata",
    tone: "paper",
    external: true,
  },
] as const;
