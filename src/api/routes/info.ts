import { Router } from "express";

import { InfoController } from "../controllers/info.js";

import asyncHandler from "../../utils/asyncHandler.js";

const infoRouter = Router();
const infoController = new InfoController();

infoRouter.get("/profile", (req, res) => {
    infoController.getProfile(req, res);
});
infoRouter.get("/info", (req, res) => {
    infoController.getInfo(req, res);
});

infoRouter.post("/contact", asyncHandler(infoController.sendMessage));

export default infoRouter;
