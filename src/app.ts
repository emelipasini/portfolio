import { resolve } from "node:path";

import express, { json } from "express";

import version from "../package.json" with { type: "json" };

import apiRouter from "./api/index.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { createRateLimitMiddleware } from "./middlewares/rateLimit.js";

import type { Request, Response } from "express";

const app = express();

app.disable("x-powered-by");
app.use(json());

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "Ok" });
});

app.use(
    createRateLimitMiddleware({
        windowMs: 15 * 60 * 1000,
        maxRequests: 100,
        intervalMs: 60 * 60 * 1000,
    })
);
app.use(corsMiddleware);

app.set("view engine", "ejs");
app.set("views", resolve("views"));

app.use(express.static(resolve("public")));
app.use("/api", apiRouter);

app.get("/version", (_req: Request, res: Response) => {
    const projectVersion = version;
    res.json({ version: projectVersion });
});

app.get(["/.well-known/security.txt", "/security.txt"], (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.sendFile(resolve("public", "files", "security.txt"));
});

app.get("/robots.txt", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.sendFile(resolve("public", "files", "robots.txt"));
});

app.get("/sitemap.xml", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.sendFile(resolve("public", "files", "sitemap.xml"));
});

app.get("/", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("index");
});

app.use((_req: Request, res: Response) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(404).render("not-found");
});

export default app;
