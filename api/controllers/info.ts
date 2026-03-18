import type { Request, Response } from "express";

import profile from "../data/profile.json";
import projects from "../data/projects.json";

export const InfoController = {
    profile: (_req: Request, res: Response): void => {
        res.json({
            status: "success",
            data: profile,
        });
    },
    projects: (_req: Request, res: Response): void => {
        res.json({
            status: "success",
            data: projects.projects,
        });
    },
};
