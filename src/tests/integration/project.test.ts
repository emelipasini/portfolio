import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../../src/app.js";

import type { Project } from "../../../src/api/models/project.js";

describe("Project Endpoints", () => {
    it("should return list of projects with status 200", async () => {
        const response = await request(app).get("/api/projects");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body).toHaveProperty("status", "Success");
        expect(body.data[0]).toHaveProperty("description");
    });

    it("should return project details by ID", async () => {
        const response = await request(app).get("/api/projects/3");
        const body = response.body as { status: string; data: Project };

        expect(response.status).toBe(200);
        expect(body).toHaveProperty("status", "Success");
        expect(body.data).toHaveProperty("id", 3);
    });
});
