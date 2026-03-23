interface Project {
    id: number;
    name: string;
    description: string;
    technologies: string[];
    type: "Personal" | "Professional";
    status: "Completed" | "In Progress";
    repository: string;
}

export type { Project };
