import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT ?? 3000;
const DOMAIN = process.env.DOMAIN ?? "http://localhost";
const ENV = process.env.NODE_ENV ?? "development";

app.listen(PORT, () => {
    logger.info(`Production server running on ${DOMAIN}:${PORT}`);

    if (ENV === "development") {
        console.log(`Development server running on ${DOMAIN}:${PORT}`);
    }
});
