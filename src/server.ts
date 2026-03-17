import app from "./app.js";

const PORT = process.env.PORT ?? 3000;
const DOMAIN = process.env.DOMAIN ?? "http://localhost";

app.listen(PORT, () => {
    console.log(`Server running on ${DOMAIN}:${PORT}`);
});
