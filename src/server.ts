import app from "./app.js";
import { env } from "./schemas/env.js";
import logger from "./utils/logger.js";

app.listen(env.PORT, () => {
    logger.info(`Production server running on ${env.DOMAIN}:${env.PORT}`);

    if (env.ENVIRONMENT === "development") {
        console.log(`Development server running on ${env.DOMAIN}:${env.PORT}`);
    }
});
