import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "./models/appError.js";
import infoRoutes from "./routes/info.js";
import projectRoutes from "./routes/project.js";
import swagger from "../docs/swagger.json";
import { globalErrorHandler } from "../middlewares/error.js";

const apiRouter = Router();

apiRouter.use("/", infoRoutes);
apiRouter.use("/projects", projectRoutes);

apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Not found", 404));
});

apiRouter.use(globalErrorHandler);

export default apiRouter;
