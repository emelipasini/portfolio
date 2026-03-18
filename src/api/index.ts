import { Router, type Request, type Response, type NextFunction } from "express";

import infoRoutes from "./routes/info.js";
import { AppError } from "./models/appError.js";

import swaggerUi from "swagger-ui-express";
import swagger from "../docs/swagger.json";

const apiRouter = Router();

apiRouter.use("/", infoRoutes);

apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new AppError("Not found", 404));
});

apiRouter.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status ?? 500;
    res.status(status).json({
        status,
        message: err.message ?? "Internal Server Error",
    });
});

export default apiRouter;
