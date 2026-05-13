import { describe, it, expect, vi, afterEach } from "vitest";

import type { Logger } from "../../utils/logger.js";

describe("Logger Config", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.resetModules();
    });

    it("should write logs to the standard output (stdout) in production", async () => {
        vi.stubEnv("ENVIRONMENT", "production");

        const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

        const { default: logger } = (await import("../../utils/logger.js")) as unknown as { default: Logger };

        const testMessage = "This is a test log message for production environment.";
        logger.info(testMessage);

        expect(writeSpy).toHaveBeenCalled();

        const calledWith = writeSpy.mock.calls[0][0] as string;
        expect(calledWith).toContain(testMessage);
    });
});
