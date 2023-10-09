import { resolve } from "node:path";
import express, { json } from "express";
import "dotenv/config";

import { corsMiddleware } from "./middlewares/cors.js";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware);

app.set("view engine", "ejs");
app.set("views", resolve("views"));
app.use(express.static(resolve("public")));

app.get("/health", (_req, res) => {
    res.send("OK");
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
