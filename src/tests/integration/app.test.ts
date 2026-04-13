import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../app";

describe("App Integration Tests", () => {
    describe("Static Content & SEO", () => {
        it("GET / should render index (HTML)", async () => {
            const res = await request(app).get("/");

            expect(res.status).toBe(200);
            expect(res.type).toBe("text/html");
        });

        it("GET /robots.txt should return plain text", async () => {
            const res = await request(app).get("/robots.txt");

            expect(res.status).toBe(200);
            expect(res.type).toBe("text/plain");
        });
    });

    describe("System Endpoints", () => {
        it("GET /health should return 200 OK", async () => {
            const res = await request(app).get("/health");

            expect(res.body).toEqual({ status: "Ok" });
        });

        it("GET /version should return project version", async () => {
            const res = await request(app).get("/version");

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("version");
        });

        it("GET /security.txt should return security policy", async () => {
            const res = await request(app).get("/.well-known/security.txt");

            expect(res.status).toBe(200);
            expect(res.type).toBe("text/plain");
        });

        it("GET /sitemap.xml should return XML sitemap", async () => {
            const res = await request(app).get("/sitemap.xml");

            expect(res.status).toBe(200);
            expect(res.type).toBe("text/xml");
        });
    });

    describe("Error Handling", () => {
        it("Should return 404 for unknown routes", async () => {
            const res = await request(app).get("/page/non-existent-page");

            expect(res.status).toBe(404);
            expect(res.text).toContain("not-found");
        });
    });
});
