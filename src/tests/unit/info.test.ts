import { describe, it, expect, vi, beforeEach } from "vitest";

import { InfoController } from "../../api/controllers/info.js";
import { DiscordService } from "../../api/services/discord.js";
import { createReqResMocks } from "../utils/reqResMocks.js";

import type { Request, Response, NextFunction } from "express";

describe("InfoController - sendMessage", () => {
    let controller: InfoController;
    let discordService: DiscordService;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();
        discordService = new DiscordService();
        controller = new InfoController(discordService);
        const mocks = createReqResMocks();
        ({ req, res, next } = mocks);
    });

    it("should return 400 if validation fails", async () => {
        req.query = {
            name: "123456",
            email: "jane.doe@email.com",
            message: "Hi, this is a test message.",
        };
        await controller.sendMessage(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "Bad Request" }));
    });
});
