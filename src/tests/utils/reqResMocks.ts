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
    next: NextFunction;
}

export const createReqResMocks = (customIp: string = "1.2.3.4"): ReqResMocks => {
    const headers: Record<string, string> = {
        "x-forwarded-for": customIp,
    };

    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn().mockReturnThis(),
        setHeader: vi.fn().mockReturnThis(),
    } as unknown as Response & ResMock;

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
