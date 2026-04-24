import type { Project } from "../../api/models/project";

export const mockProjects: Project[] = [
    {
        id: 1,
        name: "Kakebo App",
        description: "Improved design patterns and Apollo.",
        technologies: ["TypeScript", "Node.js", "React"],
        type: "Personal",
        status: "In Progress",
    },
    {
        id: 2,
        name: "Other Project",
        description: "Basic setup",
        technologies: ["React"],
        type: "Professional",
        status: "Completed",
    },
];
