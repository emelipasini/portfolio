import { Router, type Request, type Response, type NextFunction } from "express";

import infoRoutes from "./routes/info.js";
import projectRoutes from "./routes/project.js";

import { globalErrorHandler } from "../middlewares/error.js";
import { AppError } from "./models/appError.js";

import swaggerUi from "swagger-ui-express";
import swagger from "../docs/swagger.json";

const apiRouter = Router();

apiRouter.use("/", infoRoutes);
apiRouter.use("/projects", projectRoutes);

apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Not found", 404));
});

apiRouter.use(globalErrorHandler);

export default apiRouter;
