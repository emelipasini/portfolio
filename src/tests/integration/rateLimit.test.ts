import express from "express";
import request from "supertest";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { createRateLimitMiddleware } from "../../middlewares/rateLimit";
import { createReqResMocks } from "../utils/reqResMocks";

import type { Request, Response, NextFunction } from "express";

describe("Rate Limit Middleware", () => {
    let testApp: express.Application;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        testApp = express();
        const testLimiter = createRateLimitMiddleware({
            windowMs: 10000,
            maxRequests: 2,
            intervalMs: 10000,
        });
        testApp.use(testLimiter);
        testApp.get("/", (_req, res) => res.status(200).send("OK"));

        vi.clearAllMocks();
        const mocks = createReqResMocks("1.2.3.4");
        req = mocks.req as unknown as Request;
        res = mocks.res as unknown as Response;
        next = mocks.next as unknown as NextFunction;
    });

    it("should allow requests below the rate limit", async () => {
        const response = await request(testApp).get("/");
        expect(response.status).toBe(200);
    });

    it("should block requests after exceeding the limit (3rd request)", async () => {
        await request(testApp).get("/");
        await request(testApp).get("/");

        const response = await request(testApp).get("/");
        expect(response.status).toBe(429);
    });

    it("should reset the counter after the window time has passed", async () => {
        vi.useFakeTimers();

        await request(testApp).get("/");
        await request(testApp).get("/");

        vi.advanceTimersByTime(11000);

        const response = await request(testApp).get("/");
        expect(response.status).toBe(200);

        vi.useRealTimers();
    });

    it("should clear the IP counter after the interval has passed", () => {
        vi.useFakeTimers();

        const limiter = createRateLimitMiddleware({
            windowMs: 5000,
            maxRequests: 2,
            intervalMs: 1000,
        });

        limiter(req, res, next);
        expect(limiter._ipCounter).toBeDefined();
        expect(limiter._ipCounter?.["1.2.3.4"]).toBeDefined();

        vi.advanceTimersByTime(11000);
        vi.runOnlyPendingTimers();
        expect(limiter._ipCounter?.["1.2.3.4"]).toBeUndefined();

        vi.useRealTimers();
    });

    it("should use req.ip if the x-forwarded-for header does not exist", () => {
        const limiter = createRateLimitMiddleware({
            windowMs: 5000,
            maxRequests: 2,
            intervalMs: 1000,
        });

        req.header = vi.fn().mockReturnValue(undefined);
        req.ip = "150.1.2.3";

        limiter(req, res, next);
        expect(limiter._ipCounter?.["150.1.2.3"]).toBeDefined();
    });

    it("should use 'unknown' if there is no header nor req.ip", () => {
        const limiter = createRateLimitMiddleware({
            windowMs: 5000,
            maxRequests: 2,
            intervalMs: 1000,
        });

        req.header = vi.fn().mockReturnValue(undefined);
        Object.defineProperty(req, "ip", { value: undefined, writable: true });

        limiter(req, res, next);
        expect(limiter._ipCounter?.unknown).toBeDefined();
    });
});
