import logger from "../utils/logger.js";

import type { AppError } from "../api/models/appError.js";
import type { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction): void => {
    const status = err.status ?? 500;
    const message = err.message ?? "Internal Server Error";

    logger.error(
        {
            err,
            method: req.method,
            url: req.url,
            body: req.body as Record<string, unknown>,
        },
        `Error in ${req.method} ${req.url}: ${err.message}`
    );

    res.status(status).json({
        status,
        message: status === 500 ? "Internal Server Error" : message,
    });
};
