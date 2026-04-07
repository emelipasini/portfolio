import { Router } from "express";

import { ProjectController } from "../controllers/project.js";

import type { Request, Response } from "express";

const projectRouter = Router();
const projectController = new ProjectController();

projectRouter.get("/", (req: Request, res: Response) => {
    return projectController.searchProjects(req, res);
});
projectRouter.get("/:id", (req: Request, res: Response) => {
    return projectController.getProjectById(req, res);
});

export default projectRouter;
