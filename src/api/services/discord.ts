import { env } from "../../schemas/env";
import { AppError } from "../models/appError.js";

export class DiscordService {
    constructor(private readonly config = env) {}

    async sendMessageToDiscord(name: string, email: string, message: string): Promise<void> {
        const response = await fetch(this.config.DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "📩 **New message from API**",
                embeds: [
                    {
                        title: `From: ${name} (${email})`,
                        description: message,
                        color: this.config.ENVIRONMENT === "development" ? 3066993 : 10656766,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new AppError("Failed to send message to Discord", 500);
        }
    }
}
