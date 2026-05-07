import { env } from "../schemas/env";

import type { NextFunction, Request, Response } from "express";

const URL = `${env.DOMAIN}:${env.PORT}`;
const ACCEPTED_ORIGINS = [URL];

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.header("origin");

    if (origin === undefined || origin === null || ACCEPTED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin ?? "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("Referrer-Policy", "no-referrer");
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

        res.setHeader("X-Download-Options", "noopen");
        res.setHeader("X-DNS-Prefetch-Control", "off");

        const csp = [
            "default-src 'self' https:;",
            "style-src 'self' 'unsafe-inline';",
            "img-src 'self' data: https://codecov.io;",
            "script-src 'self'",
        ];
        res.setHeader("Content-Security-Policy", csp.join(" "));
    }

    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }

    next();
};
