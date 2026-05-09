export const DEFAULT_HERO = {
    heading: "Ravi Shankar",
    subheading: "Full Stack Developer & Cybersecurity Enthusiast",
    typingTexts: ["Building Secure Scalable Apps", "MERN Stack Expert", "Cloud Solutions Architect"],
    imageUrl: "https://via.placeholder.com/1000"
};

export const DEFAULT_ABOUT = {
    title: "About Me",
    description: "I am a passionate software engineer with a focus on building high-performance, secure, and user-centric web applications. With expertise in the MERN stack and a deep understanding of cloud infrastructure, I strive to create solutions that solve real-world problems.",
    imageUrl: "https://via.placeholder.com/500"
};

export const DEFAULT_PROJECTS = [
    {
        _id: "default-1",
        title: "SecureCloud Ops",
        description: "An automated CI/CD pipeline with integrated security scanning and Kubernetes deployment.",
        imageUrl: "https://picsum.photos/seed/devops/800/600",
        technologies: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"],
        githubUrl: "https://github.com",
        liveUrl: "https://github.com"
    },
    {
        _id: "default-2",
        title: "Vortex MERN Social",
        description: "A high-performance social networking platform with real-time updates and JWT-based Auth redundancy.",
        imageUrl: "https://picsum.photos/seed/mern/800/600",
        technologies: ["MongoDB", "Express", "React", "Node.js"],
        githubUrl: "https://github.com",
        liveUrl: "https://github.com"
    }
];

export const DEFAULT_SKILLS = [
    {
        _id: "cat-1",
        category: "Frontend",
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "Tailwind / CSS", level: 92 }
        ]
    },
    {
        _id: "cat-2",
        category: "Backend",
        skills: [
            { name: "Node.js / Express", level: 94 },
            { name: "MongoDB", level: 90 }
        ]
    }
];

export const DEFAULT_NAVBAR = {
    logoText: "Ravi.dev",
    links: [
        { label: "Home", url: "#hero" },
        { label: "About", url: "#about" },
        { label: "Projects", url: "#projects" },
        { label: "Skills", url: "#skills" },
        { label: "Contact", url: "#contact" }
    ]
};

export const DEFAULT_FOOTER = {
    text: "© 2026 Ravi Shankar. All rights reserved.",
    socialLinks: [
        { platform: "GitHub", url: "https://github.com" },
        { platform: "LinkedIn", url: "https://linkedin.com" }
    ]
};

export const DEFAULT_RESUME = {
    resumeUrl: "#",
    experiences: [
        {
            year: "2023 - Present",
            role: "Cloud DevOps Architect",
            company: "InfraShield Systems",
            desc: "Leading the transition to a Zero Trust architecture while optimizing MERN stack deployments via automated Kubernetes pipelines."
        },
        {
            year: "2021 - 2023",
            role: "Fullstack MERN Developer",
            company: "DataVortex Labs",
            desc: "Built scalable internal tools and customer-facing dashboards with a heavy emphasis on data integrity and real-time synchronization."
        },
        {
            year: "2019 - 2021",
            role: "Security Researcher",
            company: "CyberPulse",
            desc: "Conducted vulnerability assessments and implemented security-first CI/CD workflows for fintech startups."
        }
    ],
    courses: [
        {
            year: "2024",
            title: "Advanced Cloud Security",
            platform: "AWS Training",
            certificateUrl: "#"
        },
        {
            year: "2023",
            title: "MERN Stack Architecture",
            platform: "Meta Engineering",
            certificateUrl: "#"
        }
    ]
};

