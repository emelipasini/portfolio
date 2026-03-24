import { describe, it, expect } from "vitest";
import request from "supertest";

import type { Project } from "../../src/api/models/project.js";

import app from "../../src/app.js";

describe("API Information Endpoints", () => {
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

    it("should return list of projects with status 200", async () => {
        const response = await request(app).get("/api/projects");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body).toHaveProperty("status", "Success");
        expect(body.data[0]).toHaveProperty("description");
    });

    it("should return status 404 when searching for a non-existent term", async () => {
        const response = await request(app).get("/api/projects?q=Golang");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(404);
        expect(body).toHaveProperty("status", "Not found");
        expect(body.data).toEqual([]);
    });

    it("should return search results for a query matching technologies", async () => {
        const response = await request(app).get("/api/projects?q=typescript");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].technologies).toContain("TypeScript");
    });

    // TODO: not working, the set has "node.js"
    it.skip("should return search results for a query matching technologies with dots", async () => {
        const response = await request(app).get("/api/projects?q=node.js");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].technologies).toContain("Node.js");
    });

    it("should return search results for a query matching description", async () => {
        const response = await request(app).get("/api/projects?q=apollo");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].description).toContain("Apollo.");
    });

    it("should return search results for a query matching name", async () => {
        const response = await request(app).get("/api/projects?q=kakebo");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].name).toContain("Kakebo");
    });

    it("should return search results for a query matching type", async () => {
        const response = await request(app).get("/api/projects?q=personal");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].type).toBe("Personal");
    });

    // TODO: implement search by multiple words
    it.skip("should return search results for a query matching status", async () => {
        const response = await request(app).get("/api/projects?q=in progress");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].status).toBe("In Progress");
    });
});
