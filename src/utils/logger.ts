import path from "node:path";

import pino from "pino";

import { env } from "../schemas/env.js";

const logDir = path.join(process.cwd(), "logs");
const logFilePath = path.join(logDir, "app.log");

const isProduction = env.ENVIRONMENT === "production";

// prettier-ignore
const logger = pino({
    level: isProduction ? "info" : "debug",
    transport: !isProduction
        ? {
            target: "pino/file",
            options: {
                destination: logFilePath,
                mkdir: true,
            },
        }
        : undefined,
});

export type Logger = typeof logger;
export default logger;
