import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../../src/app.js";

describe("API Information Endpoints", () => {
    it("should return developer profile information with status 200", async () => {
        const response = await request(app).get("/api/profile");
        const body = response.body as { status: string; data: { name: string } };

        expect(response.status).toBe(200);
        expect(body).toHaveProperty("status", "success");
        expect(body.data).toHaveProperty("name");
    });

    it("should return 404 for an undefined route", async () => {
        const response = await request(app).get("/api/route-that-does-not-exist");
        const body = response.body as { status: string; message: string };

        expect(response.status).toBe(404);
        expect(body.message).toBe("Not found");
    });
});
