import { vi } from "vitest";

import type { Request, Response, NextFunction } from "express";
import type { Mock } from "vitest";

interface ResMock {
    json: Mock;
    status: Mock;
}

interface ReqResMocks {
    req: Request;
    res: Response & ResMock;
    next?: NextFunction;
}

export const createReqResMocks = (): ReqResMocks => {
    const res = {
        json: vi.fn().mockReturnThis(),
        status: vi.fn().mockReturnThis(),
    } as unknown as { json: Mock; status: Mock } & Response;

    const req = {
        params: {},
        query: {},
    } as unknown as Request;

    const next = vi.fn();

    return { req, res, next };
};
