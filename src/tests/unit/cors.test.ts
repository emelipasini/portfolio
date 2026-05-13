import { it, expect, describe, vi, beforeEach } from "vitest";

import { corsMiddleware } from "../../middlewares/cors.js";
import { env } from "../../schemas/env.js";
import { createReqResMocks } from "../utils/reqResMocks.js";

import type { Request, Response, NextFunction } from "express";

describe("CORS Middleware", () => {
    const URL = `${env.DOMAIN}:${env.PORT}`;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();
        const mocks = createReqResMocks();
        ({ req, res, next } = mocks);
    });

    it("should allow requests with no origin (undefined)", () => {
        corsMiddleware(req, res, next);

        expect(res.setHeader).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
        expect(next).toHaveBeenCalled();
    });

    it("should allow requests when origin is null", () => {
        vi.spyOn(req, "header").mockReturnValue(null as unknown as string);
        corsMiddleware(req, res, next);

        expect(res.setHeader).toHaveBeenCalledWith("Access-Control-Allow-Origin", "*");
        expect(next).toHaveBeenCalled();
    });

    it("should allow requests from an accepted origin", () => {
        vi.spyOn(req, "header").mockReturnValue(URL);
        corsMiddleware(req, res, next);

        expect(res.setHeader).toHaveBeenCalledWith("Access-Control-Allow-Origin", URL);
        expect(next).toHaveBeenCalled();
    });

    it("should not set CORS headers if origin is not allowed", () => {
        vi.spyOn(req, "header").mockReturnValue("http://malicious-site.com");
        corsMiddleware(req, res, next);

        expect(res.setHeader).not.toHaveBeenCalledWith("Access-Control-Allow-Origin", expect.any(String));
        expect(next).toHaveBeenCalled();
    });

    it("should handle OPTIONS preflight request", () => {
        Object.defineProperty(req, "method", { value: "OPTIONS" });

        corsMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
