import type { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler => {
    return (req, res, next) => {
        const run = async () => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(error);
            }
        };
        void run();
    };
};

export default asyncHandler;
