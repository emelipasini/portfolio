import { AppError } from "../api/models/appError.js";

import type { Request, Response, NextFunction, RequestHandler } from "express";

interface RateLimitOptions {
    windowMs: number;
    maxRequests: number;
    intervalMs: number;
}

type IpCounter = Record<string, { count: number; startTime: number }>;

export interface RateLimitHandler extends RequestHandler {
    _ipCounter?: IpCounter;
}

export const createRateLimitMiddleware = (options: RateLimitOptions): RateLimitHandler => {
    const ipCounter: IpCounter = {};

    const interval = setInterval(() => {
        const now = Date.now();
        for (const key in ipCounter) {
            if (Object.prototype.hasOwnProperty.call(ipCounter, key)) {
                if (now - ipCounter[key].startTime > options.windowMs) {
                    Reflect.deleteProperty(ipCounter, key);
                }
            }
        }
    }, options.intervalMs);

    if (typeof interval.unref === "function") {
        interval.unref();
    }

    const middleware: RateLimitHandler = (req: Request, _res: Response, next: NextFunction) => {
        const ip = req.header("x-forwarded-for") ?? req.ip ?? "unknown";
        const currentTime = Date.now();

        if (ipCounter[ip] === undefined) {
            ipCounter[ip] = { count: 1, startTime: currentTime };
            next();
            return;
        }

        const userData = ipCounter[ip];

        if (currentTime - userData.startTime > options.windowMs) {
            userData.count = 1;
            userData.startTime = currentTime;

            next();
            return;
        }

        userData.count++;

        if (userData.count > options.maxRequests) {
            throw new AppError("Too many requests", 429);
        }

        next();
    };

    middleware._ipCounter = ipCounter;

    return middleware;
};
