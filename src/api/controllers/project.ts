import logger from "../../utils/logger.js";

import type { Project } from "../models/project.js";
import type { Request, Response } from "express";

export class ProjectController {
    private readonly searchIndex = new Map<string, Set<string>>();
    private readonly dataIndex = new Map<string, Project>();
    private isIndexed = false;

    constructor(private readonly projects: Project[]) {
        this.buildIndex();
    }

    private getSimilarity(s1: string, s2: string): number {
        if (Math.abs(s1.length - s2.length) > 2) return 3;

        const track: number[][] = Array.from<unknown, number[]>({ length: s2.length + 1 }, () =>
            new Array<number>(s1.length + 1).fill(0)
        );

        for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
        for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;

        for (let j = 1; j <= s2.length; j += 1) {
            for (let i = 1; i <= s1.length; i += 1) {
                const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
            }
        }
        return track[s2.length][s1.length];
    }

    private buildIndex(): void {
        if (this.isIndexed) return;

        for (const project of this.projects) {
            const idStr = String(project.id);

            this.dataIndex.set(idStr, project);

            const terms = new Set([
                ...project.name.toLowerCase().split(/\s+/),
                ...project.description.toLowerCase().split(/\s+/),
                ...project.technologies.map((t) => t.toLowerCase()),
                ...project.type.toLowerCase().split(/\s+/),
                ...project.status.toLowerCase().split(/\s+/),
            ]);

            for (const term of terms) {
                const cleanTerm = term.trim().replace(/(?<!\d)\.(?!\w)|[!?;:]/g, "");
                if (cleanTerm === "") continue;

                if (!this.searchIndex.has(cleanTerm)) {
                    this.searchIndex.set(cleanTerm, new Set<string>());
                }

                this.searchIndex.get(cleanTerm)?.add(idStr);
            }
        }

        this.isIndexed = true;
    }

    public searchProjects(req: Request, res: Response): Response {
        const query = typeof req.query.q === "string" ? req.query.q.toLowerCase().trim() : "";

        if (query === "") {
            return res.json({ status: "Success", data: this.projects });
        }

        const searchTerms = query.split(/\s+/);
        let resultIds = new Set<string>();

        searchTerms.forEach((term) => {
            let idsForTerm = this.searchIndex.get(term);

            if (idsForTerm === undefined) {
                let bestMatch = "";
                let minDistance = 2;

                for (const key of this.searchIndex.keys()) {
                    const distance = this.getSimilarity(term, key);
                    if (distance <= minDistance) {
                        minDistance = distance;
                        bestMatch = key;
                    }
                }

                if (bestMatch !== "") {
                    idsForTerm = this.searchIndex.get(bestMatch);
                }
            }

            const currentTermIds = idsForTerm ?? new Set<string>();

            if (resultIds.size === 0) {
                resultIds = new Set(currentTermIds);
            } else {
                resultIds = new Set([...resultIds].filter((id) => currentTermIds.has(id)));
            }
        });

        if (resultIds.size === 0) {
            logger.info({ query }, "Search of projectsreturned no results");
            return res.status(404).json({ status: "Not found", data: [] });
        }

        const results = Array.from(resultIds)
            .map((id) => this.dataIndex.get(id))
            .filter(Boolean);

        return res.json({
            status: "Success",
            data: results,
        });
    }

    public getProjectById(req: Request, res: Response): Response {
        const id = req.params.id;

        if (typeof id !== "string") {
            return res.status(400).json({ status: "Bad Request", message: "Invalid ID" });
        }

        const project = this.dataIndex.get(id);

        if (project === undefined) {
            return res.status(404).json({ status: "Not found", data: {} });
        }

        return res.json({
            status: "Success",
            data: project,
        });
    }
}
