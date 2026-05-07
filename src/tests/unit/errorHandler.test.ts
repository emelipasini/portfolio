import { describe, it, expect, vi, beforeEach } from "vitest";

import { globalErrorHandler } from "../../middlewares/error";
import { createReqResMocks } from "../utils/reqResMocks";

import type { AppError } from "../../api/models/appError";
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
