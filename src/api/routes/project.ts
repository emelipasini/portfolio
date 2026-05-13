import { Router } from "express";

import projects from "../../data/projects.json" with { type: "json" };
import { ProjectController } from "../controllers/project.js";

import type { Project } from "../models/project.js";
import type { Request, Response } from "express";

const projectRouter = Router();
const projectController = new ProjectController(projects.projects as unknown as Project[]);

projectRouter.get("/", (req: Request, res: Response) => {
    return projectController.searchProjects(req, res);
});
projectRouter.get("/:id", (req: Request, res: Response) => {
    return projectController.getProjectById(req, res);
});

export default projectRouter;
