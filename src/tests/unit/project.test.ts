import { describe, it, expect, vi, beforeEach } from "vitest";

import { ProjectController } from "../../api/controllers/project";
import { mockProjects } from "../utils/projectsMocks";
import { createReqResMocks } from "../utils/reqResMocks";

import type { Project } from "../../api/models/project.js";
import type { Request, Response } from "express";

interface ControllerWithPrivate {
    buildIndex: () => void;
}

describe("ProjectController", () => {
    let controller: ProjectController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        vi.clearAllMocks();
        controller = new ProjectController(mockProjects);
        const mocks = createReqResMocks();
        ({ req, res } = mocks);
    });

    describe("getProjectById", () => {
        it("should return 404 when searching for a non-existent project ID", () => {
            req.params.id = "non-existent";
            controller.getProjectById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "Not found", data: {} }));
        });

        it("should return 400 when searching with an invalid ID type", () => {
            req.params.id = 123 as unknown as string;
            controller.getProjectById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({ status: "Bad Request", message: "Invalid ID" })
            );
        });
    });

    describe("searchProjects", () => {
        it("should return 404 if project is not found", () => {
            req.query.q = "Golang";
            controller.searchProjects(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: "Not found", data: [] }));
        });

        it("should return search results for a query matching technologies", () => {
            req.query.q = "typescript";
            controller.searchProjects(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    status: "Success",
                    data: expect.arrayContaining([
                        expect.objectContaining({
                            technologies: expect.arrayContaining(["TypeScript"]) as string[],
                        }),
                    ]) as Project,
                })
            );
        });

        it("should return search results for a query with multiple words", () => {
            req.query.q = "improved design patterns";
            controller.searchProjects(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: "Success",
                data: expect.arrayContaining([
                    expect.objectContaining({
                        description: expect.stringContaining("Improved design patterns") as string,
                    }),
                ]) as Project,
            });
        });

        it("should return search results for a query with typos", () => {
            req.query.q = "improed desgn";
            controller.searchProjects(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: "Success",
                data: expect.arrayContaining([
                    expect.objectContaining({
                        description: expect.stringContaining("Improved design patterns") as string,
                    }),
                ]) as Project,
            });
        });

        it("should return search results for a query with partial word", () => {
            req.query.q = "improv";
            controller.searchProjects(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: "Success",
                data: expect.arrayContaining([
                    expect.objectContaining({
                        description: expect.stringContaining("Improved design patterns") as string,
                    }),
                ]) as Project,
            });
        });

        it("should filter results using AND logic for multiple terms", () => {
            req.query.q = "React Node.js";
            controller.searchProjects(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    status: "Success",
                    data: expect.arrayContaining([
                        expect.objectContaining({
                            technologies: expect.arrayContaining(["React", "Node.js"]) as string[],
                        }),
                    ]) as Project,
                })
            );
        });
    });

    describe("searchProjects - Field matching", () => {
        it.each([
            { query: "apollo", field: "description", expected: "Apollo" },
            { query: "kakebo", field: "name", expected: "Kakebo" },
            { query: "personal", field: "type", expected: "Personal" },
            { query: "in progress", field: "status", expected: "In Progress" },
        ])("should find project by $field when searching $query", ({ query, field, expected }) => {
            req.query.q = query;
            controller.searchProjects(req, res);

            expect(res.json).toHaveBeenCalledWith({
                status: "Success",
                data: expect.arrayContaining([
                    expect.objectContaining({
                        [field]: expect.stringContaining(expected) as string,
                    }),
                ]) as Project[],
            });
        });
    });

    describe("Indexing Logic (Edge Cases)", () => {
        it("should not re-index on manual buildIndex call", () => {
            const spy = vi.spyOn(Map.prototype, "set");
            spy.mockClear();

            (controller as unknown as ControllerWithPrivate).buildIndex();
            expect(spy).not.toHaveBeenCalled();
            spy.mockRestore();
        });

        it("should ignore punctuation-only terms", () => {
            const junkData = [
                { id: "9", name: "!!!", description: "...", technologies: [], type: "T", status: "S" },
            ] as unknown as Project[];
            const junkController = new ProjectController(junkData);
            req.query.q = "!!!";

            junkController.searchProjects(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});
