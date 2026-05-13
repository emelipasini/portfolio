import { z } from "zod";

const envSchema = z.object({
    DOMAIN: z.string().url().default("http://localhost"),
    PORT: z.coerce.number().default(3000),
    ENVIRONMENT: z.enum(["development", "production", "test"]).default("development"),
    DISCORD_WEBHOOK_URL: z.string().url(),
});

export type envData = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
