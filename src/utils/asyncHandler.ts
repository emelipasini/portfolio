import type { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>): RequestHandler => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncHandler;
