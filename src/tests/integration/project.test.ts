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

    it("should return 404 when searching for a non-existent project ID", async () => {
        const response = await request(app).get("/api/projects/false-id");
        const body = response.body as { status: string; data: Record<string, never> };

        expect(response.status).toBe(404);
        expect(body).toHaveProperty("status", "Not found");
        expect(body.data).toEqual({});
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

    it("should return search results for a query matching technologies with dots", async () => {
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

    it("should return search results for a query matching status", async () => {
        const response = await request(app).get("/api/projects?q=in progress");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].status).toBe("In Progress");
    });

    it("should return search results for a query with multiple words", async () => {
        const response = await request(app).get("/api/projects?q=improved design patterns");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].description).toContain("improved design patterns");
    });

    it("should return search results for a query with typos", async () => {
        const response = await request(app).get("/api/projects?q=improed desgn");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].description).toContain("improved design patterns");
    });

    it("should return search results for a query with partial word", async () => {
        const response = await request(app).get("/api/projects?q=impro");
        const body = response.body as { status: string; data: Project[] };

        expect(response.status).toBe(200);
        expect(body.data[0].description).toContain("improved design patterns");
    });
});
