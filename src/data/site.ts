export const profile = {
  name: "Juan Camilo Ramirez Tabares",
  given: "Juan Camilo",
  family: "Ramirez Tabares",
  username: "Jucarata",
  role: "Software Engineer",
  location: "Cali, Colombia",
  email: "contact.jucara@gmail.com",
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

export const professionalProjects = [
  {
    tone: "blue",
    title: "SGIRS",
    status: "Finished",
    privacy: "Public",
    text: "Waste reporting platform for the Mayor's Office of Santiago de Cali. Businesses record what they generate and how it is treated. I built authentication, the business logic, and the transactional and dimensional databases.",
    image: "projects/sgirs.jpeg",
    imageAlt: "SGIRS Cali sign-in screen.",
    live: "https://sgirs.cali.gov.co/",
  },
  {
    tone: "red",
    title: "Integra",
    status: "In dev",
    privacy: "Private",
    text: "Asset inventory for a company located in Medellín. It follows equipment through registration, assignment, return, and decommission. I worked on the interface, the business logic, the database, and the application architecture. The platform stays private while it is in development.",
    image: "projects/default.jpg",
    imageAlt: "",
  },
] as const;

export const personalProjects = [
  {
    tone: "ink",
    title: "Financa",
    status: "Finished",
    privacy: "Public",
    text: "I needed one record of my money: the balance in each bank, the total, how much I saved last month compared with earlier months, and income and expenses with their concepts. Financa is that record. Each entry is added by hand, so the app stays basic.",
    image: "projects/financa.png",
    imageAlt: "Financa expense summary, net worth chart, and balance by bank.",
    repo: "https://github.com/jucarata/Financa",
    live: "https://jucarata.github.io/Financa/",
  },
  {
    tone: "red",
    title: "Job Matching Assistant",
    status: "Finished",
    privacy: "Public",
    text: "While looking for work, comparing each vacancy with my experience meant reading the description and repeating the same matching prompt in a new chat. I built an agent that already holds structured information about me and decides whether a role is worth an application. It weighs years of experience, technologies, location, and more, then scores the fit against a threshold I can change. Mine is set at 7, so a vacancy above a 70% fit is one I should apply to.",
    image: "projects/job-matching.png",
    imageAlt: "Job Matching Assistant showing a match score and the profile read from a CV.",
    repo: "https://github.com/jucarata/Job-Matching-Assistant",
    live: "https://jucarata.github.io/Job-Matching-Assistant/",
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
