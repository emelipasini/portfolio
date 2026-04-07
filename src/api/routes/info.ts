import { Router } from "express";

import asyncHandler from "../../utils/asyncHandler.js";
import { InfoController } from "../controllers/info.js";

import type { Request, Response } from "express";

const infoRouter = Router();
const infoController = new InfoController();

infoRouter.get("/profile", (req: Request, res: Response) => {
    infoController.getProfile(req, res);
});
infoRouter.get("/info", (req: Request, res: Response) => {
    infoController.getInfo(req, res);
});

infoRouter.post("/contact", asyncHandler(infoController.sendMessage));

export default infoRouter;
