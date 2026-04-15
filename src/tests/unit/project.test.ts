import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

import { ProjectController } from "../../api/controllers/project";

import type { Project } from "../../api/models/project";
import type { Request, Response } from "express";

describe("ProjectController - getProjectById", () => {
    let controller: ProjectController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        controller = new ProjectController();
        req = {
            params: {
                id: "false-id",
            },
        } as unknown as Request;
        res = {
            json: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
        } as unknown as {
            json: Mock;
            status: Mock;
        } & Response;
    });

    it("should return 404 when searching for a non-existent project ID", () => {
        controller.getProjectById(req, res);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "Not found", data: {} }));
    });
});

describe("ProjectController - searchProjects", () => {
    let controller: ProjectController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        controller = new ProjectController();
        req = {
            query: {
                q: "query",
            },
        } as unknown as Request;
        res = {
            json: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
        } as unknown as {
            json: Mock;
            status: Mock;
        } & Response;
    });

    it("should return 404 if project is not found", () => {
        req.query.q = "Golang";
        controller.searchProjects(req, res);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "Not found", data: [] }));
    });

    it("should return search results for a query matching technologies", () => {
        req.query.q = "typescript";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].technologies).toContain("TypeScript");
    });

    it("should return search results for a query matching technologies with dots", () => {
        req.query.q = "node.js";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].technologies).toContain("Node.js");
    });

    it("should return search results for a query matching description", () => {
        req.query.q = "apollo";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].description).toContain("Apollo.");
    });

    it("should return search results for a query matching name", () => {
        req.query.q = "kakebo";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].name).toContain("Kakebo");
    });

    it("should return search results for a query matching type", () => {
        req.query.q = "personal";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].type).toBe("Personal");
    });

    it("should return search results for a query matching status", () => {
        req.query.q = "in progress";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].status).toBe("In Progress");
    });

    it("should return search results for a query with multiple words", () => {
        req.query.q = "improved design patterns";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].description).toContain("improved design patterns");
    });

    it("should return search results for a query with typos", () => {
        req.query.q = "improed desgn";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].description).toContain("improved design patterns");
    });

    it("should return search results for a query with partial word", () => {
        req.query.q = "impro";
        controller.searchProjects(req, res);

        const resJson = vi.mocked(res.json);
        const responseBody = resJson.mock.lastCall?.[0] as { status: string; data: Project[] };

        expect(responseBody.status).toBe("Success");
        expect(responseBody.data[0].description).toContain("improved design patterns");
    });
});
