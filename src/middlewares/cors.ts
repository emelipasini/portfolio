import { env } from "../schemas/env";

import type { NextFunction, Request, Response } from "express";

const URL = `${env.DOMAIN}:${env.PORT}`;
const ACCEPTED_ORIGINS = [URL];

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.header("origin") ?? URL;

    if (ACCEPTED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
        const cspPolicy = [
            "default-src 'self' https:;",
            "style-src 'self' 'unsafe-inline';",
            "img-src 'self' data: https://codecov.io;",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        ].join(" ");

        res.setHeader("Content-Security-Policy", cspPolicy);
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("Referrer-Policy", "no-referrer");
    }

    if (env.ENVIRONMENT === "development") {
        res.setHeader(
            "Content-Security-Policy",
            "img-src 'self' data: https://codecov.io; style-src 'self' 'unsafe-inline'"
        );
    }

    next();
};
