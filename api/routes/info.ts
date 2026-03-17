import { Router } from "express";

import { InfoController } from "../controllers/info.js";

const infoRouter = Router();

infoRouter.get("/profile", InfoController.profile);

export default infoRouter;
