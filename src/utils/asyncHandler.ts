import type { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>): RequestHandler => {
    return (req, res, next) => {
        try {
            void fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncHandler;
