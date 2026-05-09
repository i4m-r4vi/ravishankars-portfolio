import { Project, Skill } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "SecureCloud Ops",
    description: "An automated CI/CD pipeline with integrated security scanning and Kubernetes deployment.",
    image: "https://picsum.photos/seed/devops/800/600",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"],
  },
  {
    id: "2",
    title: "Vortex MERN Social",
    description: "A high-performance social networking platform with real-time updates and JWT-based Auth redundancy.",
    image: "https://picsum.photos/seed/mern/800/600",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    id: "3",
    title: "Sentinel Shield",
    description: "A cybersecurity auditing tool that identifies vulnerabilities in cloud configurations and suggests patches.",
    image: "https://picsum.photos/seed/security/800/600",
    tags: ["Python", "AWS", "Security", "Automation"],
  },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "Tailwind / GSAP", level: 92, category: "Frontend" },
  { name: "Redux / Zustand", level: 88, category: "Frontend" },
  { name: "Node.js / Express", level: 94, category: "Backend" },
  { name: "MongoDB / PostgreSQL", level: 90, category: "Backend" },
  { name: "REST / GraphQL", level: 85, category: "Backend" },
  { name: "Vulnerability Assessment", level: 82, category: "Design" }, // Repurposed for Security
  { name: "Network Security", level: 80, category: "Design" },
  { name: "AppSec / JWT", level: 88, category: "Design" },
  { name: "Docker / K8s", level: 85, category: "Other" },
  { name: "AWS / Cloudflare", level: 82, category: "Other" },
  { name: "CI/CD / Terraform", level: 80, category: "Other" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
};
