import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

import { InfoController } from "../../api/controllers/info";
import { DiscordService } from "../../api/services/discord";

import type { Request, Response } from "express";

describe("InfoController - sendMessage", () => {
    let controller: InfoController;
    let discordService: DiscordService;

    beforeEach(() => {
        discordService = new DiscordService();
        controller = new InfoController(discordService);
    });

    it("should return 400 if validation fails", async () => {
        const req = {
            query: {
                name: "123456",
                email: "jane.doe@email.com",
                message: "Hi, this is a test message.",
            },
        } as unknown as Request;
        const res = {
            json: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
        } as unknown as {
            json: Mock;
            status: Mock;
        } & Response;
        const next = vi.fn();

        await controller.sendMessage(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "Bad Request" }));
    });
});
