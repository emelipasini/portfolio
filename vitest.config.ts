import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        env: {
            DISCORD_WEBHOOK_URL: "http://mock-url.com",
        },
        include: ["./src/**/*.{test,spec}.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "json-summary", "html"],
            exclude: ["src/api/models/**", "public/**", "build/**", "dist/**", "node_modules/**", "src/server.{js,ts}"],
            thresholds: {
                lines: 80,
                functions: 85,
                branches: 80,
                statements: 80,
            },
        },
    },
});
