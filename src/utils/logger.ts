import path from "node:path";

import pino from "pino";

const logDir = path.join(process.cwd(), "logs");
const logFilePath = path.join(logDir, "app.log");

const isProduction = process.env.ENVIRONMENT === "production";

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

export default logger;
