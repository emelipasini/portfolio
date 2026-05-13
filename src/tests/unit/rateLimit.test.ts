import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { createRateLimitMiddleware } from "../../middlewares/rateLimit";
import { createReqResMocks } from "../utils/reqResMocks";

import type { RateLimitHandler } from "../../middlewares/rateLimit";
import type { Request, Response, NextFunction } from "express";

describe("Rate Limit - Unit Tests", () => {
    let limiter: RateLimitHandler;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        limiter = createRateLimitMiddleware({
            windowMs: 5000,
            maxRequests: 2,
            intervalMs: 10000,
        });
        const mocks = createReqResMocks("1.2.3.4");
        ({ req, res, next } = mocks);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should reset the counter after the window time has passed", () => {
        limiter(req, res, next);
        limiter(req, res, next);
        vi.advanceTimersByTime(6000);

        limiter(req, res, next);
        expect(limiter._ipCounter?.["1.2.3.4"].count).toBe(1);
        expect(next).toHaveBeenCalledTimes(3);
    });

    it("should clear the IP counter after the interval has passed", () => {
        limiter(req, res, next);
        expect(limiter._ipCounter?.["1.2.3.4"]).toBeDefined();

        vi.advanceTimersByTime(11000);
        expect(limiter._ipCounter?.["1.2.3.4"]).toBeUndefined();
    });

    it("should extract the IP correctly from the x-forwarded-for header", () => {
        req.header = vi.fn().mockReturnValue("10.0.0.1");

        limiter(req, res, next);
        expect(limiter._ipCounter?.["10.0.0.1"]).toBeDefined();
    });

    it("should use 'unknown' if there is no header nor req.ip", () => {
        req.header = vi.fn().mockReturnValue(undefined);
        Object.defineProperty(req, "ip", { value: undefined, writable: true });

        limiter(req, res, next);
        expect(limiter._ipCounter?.unknown).toBeDefined();
    });

    it("should clean up multiple expired IPs but keep the active ones", () => {
        vi.advanceTimersByTime(4000);
        limiter(req, res, next);

        vi.advanceTimersByTime(4000);
        const otherReq = { ...req, header: vi.fn().mockReturnValue("9.9.9.9") } as unknown as Request;
        limiter(otherReq, res, next);

        vi.advanceTimersByTime(2000);
        expect(limiter._ipCounter?.["1.2.3.4"]).toBeUndefined();
        expect(limiter._ipCounter?.["9.9.9.9"]).toBeDefined();
    });

    it("should not explode if setInterval does not return an object with unref", () => {
        const setIntervalSpy = vi.spyOn(global, "setInterval");
        setIntervalSpy.mockReturnValue(12345 as unknown as NodeJS.Timeout);

        expect(() => {
            createRateLimitMiddleware({
                windowMs: 5000,
                maxRequests: 2,
                intervalMs: 10000,
            });
        }).not.toThrow();
        setIntervalSpy.mockRestore();
    });
});
