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

export const createReqResMocks = (customIp: string = "1.2.3.4"): ReqResMocks => {
    const headers: Record<string, string> = {
        "x-forwarded-for": customIp,
    };

    const res = {
        json: vi.fn().mockReturnThis(),
        status: vi.fn().mockReturnThis(),
    } as unknown as { json: Mock; status: Mock } & Response;

    const req = {
        params: {},
        query: {},
        headers,
        header: vi.fn((name: string) => headers[name.toLowerCase()]),
        ip: customIp,
    } as unknown as Request;

    const next = vi.fn();

    return { req, res, next };
};
