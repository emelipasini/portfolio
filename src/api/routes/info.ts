import { Router } from "express";

import { InfoController } from "../controllers/info.js";

const infoRouter = Router();
const infoController = new InfoController();

infoRouter.get("/profile", (req, res) => {
    infoController.getProfile(req, res);
});
infoRouter.get("/info", (req, res) => {
    infoController.getInfo(req, res);
});

infoRouter.get("/projects", (req, res) => {
    return infoController.searchProjects(req, res);
});
infoRouter.get("/projects/:id", (req, res) => {
    return infoController.getProjectById(req, res);
});

export default infoRouter;
