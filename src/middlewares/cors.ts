import { type NextFunction, type Request, type Response } from "express";

const PORT = process.env.PORT ?? 3000;
const DOMAIN = process.env.URL ?? "http://localhost";
const URL = `${DOMAIN}:${PORT}`;

const ACCEPTED_ORIGINS = [URL];

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.header("origin") ?? URL;

    if (ACCEPTED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET");
    }
    next();
};
