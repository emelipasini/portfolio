import { describe, it, expect, vi, beforeEach } from "vitest";

import { AppError } from "../../api/models/appError.js";
import { DiscordService } from "../../api/services/discord.js";

import type { DiscordPayload } from "../../api/models/discord.js";
import type { envData } from "../../schemas/env.js";

describe("DiscordService (DI Unit Test)", () => {
    let service: DiscordService;

    beforeEach(() => {
        service = new DiscordService();
        vi.stubGlobal(
            "fetch",
            vi.fn(async () => await Promise.resolve({ ok: true }))
        );
    });

    it("should send a message correctly with the expected parameters", async () => {
        await service.sendMessageToDiscord("John Doe", "john@example.com", "Hello!");

        const fetchSpy = vi.mocked(global.fetch);
        const callOptions = fetchSpy.mock.calls[0][1];

        if (callOptions !== undefined && callOptions !== null && typeof callOptions.body === "string") {
            const jsonString: string = callOptions.body;
            const body = JSON.parse(jsonString) as DiscordPayload;
            expect(body.embeds[0].title).toContain("John Doe");
            expect(body.embeds[0].description).toBe("Hello!");
            expect(body.embeds[0].color).toBe(3066993);
        }
    });

    it("should use production color when env is production", async () => {
        const prodConfig = { DISCORD_WEBHOOK_URL: "http://test.com", ENVIRONMENT: "production" } as unknown as envData;
        const serviceProd = new DiscordService(prodConfig);
        await serviceProd.sendMessageToDiscord("John Doe", "john@example.com", "Hello!");

        const fetchSpy = vi.mocked(global.fetch);
        const callOptions = fetchSpy.mock.calls[0][1];

        if (callOptions !== undefined && callOptions !== null && typeof callOptions.body === "string") {
            const jsonString: string = callOptions.body;
            const body = JSON.parse(jsonString) as DiscordPayload;
            expect(body.embeds[0].color).toBe(10656766);
        }
    });

    it("should throw an AppError if Discord's response is not successful", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn(
                async () =>
                    await Promise.resolve({
                        ok: false,
                        status: 500,
                    })
            )
        );

        await expect(service.sendMessageToDiscord("A", "B", "C")).rejects.toThrow(AppError);
        await expect(service.sendMessageToDiscord("A", "B", "C")).rejects.toThrow("Failed to send message to Discord");
    });
});
