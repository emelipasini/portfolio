import { describe, it, expect, vi, beforeEach } from "vitest";

import { globalErrorHandler } from "../../middlewares/error.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { createReqResMocks } from "../utils/reqResMocks.js";

import type { AppError } from "../../api/models/appError.js";
import type { Request, Response, NextFunction } from "express";

describe("globalErrorHandler", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();
        const mocks = createReqResMocks();
        ({ req, res, next } = mocks);
    });

    it("should handle errors with status and message", () => {
        const error = new Error() as AppError;
        error.status = 400;
        error.message = "Bad Request";
        globalErrorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            message: "Bad Request",
        });
    });

    it("should use default values", () => {
        const errorWithoutMessage = {} as unknown as AppError;
        globalErrorHandler(errorWithoutMessage, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            message: "Internal Server Error",
        });
    });
});

describe("asyncHandler", () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();
        const mocks = createReqResMocks();
        ({ req, res, next } = mocks);
    });

    it("should call next with the error when the provided function fails", async () => {
        const error = new Error("Async failure");
        const failingAsyncFunction = async () => {
            await Promise.reject(error);
            throw error;
        };
        const handler = asyncHandler(failingAsyncFunction);
        handler(req, res, next);

        await new Promise(process.nextTick);
        expect(next).toHaveBeenCalledWith(error);
        expect(next).toHaveBeenCalledTimes(1);
    });
});
