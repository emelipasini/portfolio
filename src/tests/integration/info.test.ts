import request from "supertest";
import { describe, it, expect, vi } from "vitest";

import app from "../../app.js";

describe("Information Endpoints", () => {
    it("should return developer profile information with status 200", async () => {
        const response = await request(app).get("/api/profile");
        const body = response.body as { status: string; data: { name: string } };

        expect(response.status).toBe(200);
        expect(body).toHaveProperty("status", "Success");
        expect(body.data).toHaveProperty("name");
    });

    it("should return 404 for an undefined route", async () => {
        const response = await request(app).get("/api/route-that-does-not-exist");
        const body = response.body as { status: string; message: string };

        expect(response.status).toBe(404);
        expect(body.message).toBe("Not found");
    });

    it("should return website information with status 200", async () => {
        const response = await request(app).get("/api/info");
        const body = response.body as { status: string; data: { project_name: string } };

        expect(response.status).toBe(200);
        expect(body).toHaveProperty("status", "Success");
        expect(body.data).toHaveProperty("project_name", "Professional Portfolio API");
    });

    it("should send a contact message and return success response", async () => {
        const fetchSpy = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ success: true }),
        });

        vi.stubGlobal("fetch", fetchSpy);

        const response = await request(app).post("/api/contact").send({
            name: "Jane Doe",
            email: "jane.doe@test.com",
            message: "Hello, this is a test message.",
        });

        expect(response.status).toBe(200);
        expect(fetchSpy).toHaveBeenCalled();

        vi.unstubAllGlobals();
    });
});
