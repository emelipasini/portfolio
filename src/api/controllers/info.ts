import type { Request, Response } from "express";

import profile from "../../data/profile.json";
import { projects } from "../../data/projects.json";

import type { Project } from "../models/project.js";

export class InfoController {
    searchIndex = new Map<string, Set<string>>();
    dataIndex = new Map<string, Project>();
    isIndexed = false;

    constructor() {
        this.buildIndex();
    }

    buildIndex(): void {
        if (this.isIndexed) return;

        (projects as Project[]).forEach((project: Project) => {
            const idStr = String(project.id);

            this.dataIndex.set(idStr, project);

            const terms = new Set([
                ...project.name.toLowerCase().split(" "),
                ...project.description.toLowerCase().split(" "),
                ...project.technologies.map((t) => t.toLowerCase()),
                ...project.type.toLowerCase().split(" "),
                ...project.status.toLowerCase().split(" "),
            ]);

            terms.forEach((term) => {
                const cleanTerm = term.trim().replace(/[.,!?;:]/g, "");
                if (cleanTerm === "") return;

                if (!this.searchIndex.has(cleanTerm)) {
                    this.searchIndex.set(cleanTerm, new Set());
                }
                this.searchIndex.get(cleanTerm)?.add(idStr);
            });
        });

        this.isIndexed = true;
    }

    profile(_req: Request, res: Response): void {
        res.json({
            status: "Success",
            data: profile,
        });
    }

    searchProjects(req: Request, res: Response): Response {
        this.buildIndex();

        const query = typeof req.query.q === "string" ? req.query.q.toLowerCase().trim() : "";

        if (query === "") {
            return res.json({ status: "Success", data: projects });
        }

        const resultIds = this.searchIndex.get(query) ?? new Set<string>();

        if (resultIds.size === 0) {
            return res.status(404).json({ status: "Not found", data: [] });
        }

        const results = Array.from(resultIds)
            .map((id) => this.dataIndex.get(id))
            .filter(Boolean);

        return res.json({
            status: "Success",
            count: results.length,
            data: results,
        });
    }
}
