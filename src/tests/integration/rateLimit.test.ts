import express from "express";
import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";

import { createRateLimitMiddleware } from "../../middlewares/rateLimit";

describe("Rate Limit Middleware", () => {
    let testApp: express.Application;

    beforeEach(() => {
        testApp = express();
        const testLimiter = createRateLimitMiddleware({
            windowMs: 10000,
            maxRequests: 2,
            intervalMs: 10000,
        });
        testApp.use(testLimiter);
        testApp.get("/", (_req, res) => res.status(200).send("OK"));
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
});
