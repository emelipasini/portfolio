import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../app";

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
        const response = await request(app).post("/api/contact").send({
            name: "Jane Doe",
            email: "jane.doe@test.com",
            message: "Hello, this is a test message.",
        });
        const body = response.body as { status: string; data: string };

        expect(response.status).toBe(200);
        expect(body).toHaveProperty("status", "Success");
        expect(body.data).toBe("Message sent successfully");
    });

    it("should return 400 when required fields are missing in contact message", async () => {
        const response = await request(app).post("/api/contact").send({
            name: "123456",
            email: "jane.doe@email.com",
            message: "Hi, this is a test message.",
        });
        const body = response.body as { status: string; message: string };

        expect(response.status).toBe(400);
        expect(body).toHaveProperty("status", "Bad Request");
    });
});
