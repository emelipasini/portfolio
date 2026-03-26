import { Router } from "express";

import { ProjectController } from "../controllers/project.js";

const projectRouter = Router();
const projectController = new ProjectController();

projectRouter.get("/", (req, res) => {
    return projectController.searchProjects(req, res);
});
projectRouter.get("/:id", (req, res) => {
    return projectController.getProjectById(req, res);
});

export default projectRouter;
