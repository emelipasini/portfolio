import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Env Configuration Unit Test", () => {
    beforeEach(() => {
        vi.resetModules();
        vi.unstubAllEnvs();
    });

    it("should pass with valid environment variables", async () => {
        vi.stubEnv("DOMAIN", "http://localhost");
        vi.stubEnv("PORT", "4000");
        vi.stubEnv("ENVIRONMENT", "test");
        vi.stubEnv("DISCORD_WEBHOOK_URL", "https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz");

        const { env } = await import("../../schemas/env");

        expect(env.DOMAIN).toBe("http://localhost");
        expect(env.PORT).toBe(4000);
        expect(env.ENVIRONMENT).toBe("test");
        expect(env.DISCORD_WEBHOOK_URL).toBe("https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz");
    });

    it("should fail validation if DISCORD_WEBHOOK_URL is missing", async () => {
        vi.stubEnv("DISCORD_WEBHOOK_URL", "");

        await expect(import("../../schemas/env")).rejects.toThrow();
    });

    it("should fail if DISCORD_WEBHOOK_URL is not a valid URL", async () => {
        vi.stubEnv("DISCORD_WEBHOOK_URL", "not-a-valid-url");

        await expect(import("../../schemas/env")).rejects.toThrow(/url/i);
    });

    it("should fail validation if DOMAIN is missing", async () => {
        vi.stubEnv("DOMAIN", "");

        await expect(import("../../schemas/env")).rejects.toThrow();
    });

    it("should fail if DOMAIN is not a valid URL", async () => {
        vi.stubEnv("DOMAIN", "not-a-valid-url");

        await expect(import("../../schemas/env")).rejects.toThrow(/url/i);
    });

    it("should fail validation if PORT is missing", async () => {
        vi.stubEnv("PORT", "undefined");

        await expect(import("../../schemas/env")).rejects.toThrow();
    });

    it("should fail if ENVIRONMENT is set to an invalid value", async () => {
        vi.stubEnv("ENVIRONMENT", "invalid-env");

        await expect(import("../../schemas/env")).rejects.toThrow(/invalid enum value/i);
    });

    it("should use default values for optional environment variables", async () => {
        vi.stubEnv("DOMAIN", "http://localhost");
        vi.stubEnv("DISCORD_WEBHOOK_URL", "https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz");

        const { env } = await import("../../schemas/env");

        expect(env.PORT).toBe(3000);
        expect(env.ENVIRONMENT).toBe("development");
    });
});
