import { type NextFunction, type Request, type Response } from "express";

const PORT = process.env.PORT ?? 3000;
const DOMAIN = process.env.DOMAIN ?? "http://localhost";
const ENVIRONMENT = process.env.ENVIRONMENT ?? "development";

const URL = `${DOMAIN}:${PORT}`;
const ACCEPTED_ORIGINS = [URL];

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.header("origin") ?? URL;

    if (ACCEPTED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
        res.setHeader("Content-Security-Policy", "default-src https:");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("Referrer-Policy", "no-referrer");
    }

    if (ENVIRONMENT === "development") {
        res.header("Content-Security-Policy", "img-src 'self'");
    }

    next();
};
