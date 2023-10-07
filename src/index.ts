import express, { json } from "express";
import "dotenv/config";

import { corsMiddleware } from "./middlewares/cors.js";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware);

app.get("/health", (_req, res) => {
    res.send("OK");
});

app.get("/", (_req, res) => {
    res.send("Hello World!");
});

app.use((_req, res) => {
    res.status(404).send("Not Found");
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
