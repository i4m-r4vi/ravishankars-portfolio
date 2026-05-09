export interface Admin {
    _id: string;
    username: string;
    token: string;
}

export interface About {
    _id?: string;
    title: string;
    description: string;
    imageUrl?: string;
}

export interface Hero {
    _id?: string;
    heading: string;
    subheading: string;
    typingTexts: string[];
    imageUrl?: string;
}

export interface Project {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export interface Skill {
    _id: string;
    category: string;
    skills: {
        name: string;
        level: number;
    }[];
}

export interface Resume {
    _id?: string;
    resumeUrl: string;
    version?: string;
    experiences: {
        year: string;
        role: string;
        company: string;
        desc: string;
    }[];
    courses: {
        year: string;
        title: string;
        platform: string;
        desc: string;
        certificateUrl?: string;
    }[];
}

export interface Navbar {
    _id?: string;
    logoText: string;
    links: {
        label: string;
        url: string;
    }[];
}

export interface Footer {
    _id?: string;
    text: string;
    socialLinks: {
        platform: string;
        url: string;
        icon?: string;
    }[];
}
