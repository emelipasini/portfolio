import { resolve } from "node:path";
import express, { json } from "express";
import "dotenv/config";

import { version } from "../package.json";

import { corsMiddleware } from "./middlewares/cors.js";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware);

app.set("view engine", "ejs");
app.set("views", resolve("views"));
app.use(express.static(resolve("public")));

app.get("/version", (_req, res) => {
    const projectVersion = version;
    res.json({ version: projectVersion });
});

app.get("/health", (_req, res) => {
    res.json({ status: "Ok" });
});

app.get(["/.well-known/security.txt", "/security.txt"], (_req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.sendFile(resolve("public", "files", "security.txt"));
});

app.get("/robots.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.sendFile(resolve("public", "files", "robots.txt"));
});

app.get("/sitemap.xml", (_req, res) => {
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.sendFile(resolve("public", "files", "sitemap.xml"));
});

app.get("/", (_req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.render("index");
});

app.use((_req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(404).render("not-found");
});

const PORT = process.env.PORT ?? 3000;
const DOMAIN = process.env.DOMAIN ?? "http://localhost";

app.listen(PORT, () => {
    console.log(`Server running on ${DOMAIN}:${PORT}`);
});
