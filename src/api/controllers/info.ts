import pageInfo from "../../data/page-info.json";
import profile from "../../data/profile.json";
import ContactSchema from "../../schemas/contact";
import logger from "../../utils/logger";

import type { Request, Response, NextFunction } from "express";

export class InfoController {
    constructor(
        private readonly webhookUrl = process.env.DISCORD_WEBHOOK_URL,
        private readonly env = process.env.ENVIRONMENT
    ) {}

    getProfile(_req: Request, res: Response): void {
        res.json({
            status: "Success",
            data: profile,
        });
    }

    getInfo(_req: Request, res: Response): void {
        res.json({
            status: "Success",
            data: pageInfo,
        });
    }

    sendMessage = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
        const result = ContactSchema.safeParse(req.body);

        if (!result.success) {
            logger.warn({ issues: result.error.format() }, "Form validation failed");
            return res.status(400).json({
                status: "Bad Request",
                ...result.error.format(),
            });
        }

        const { name, email, message } = result.data;

        if (this.webhookUrl === undefined) {
            throw new Error("WEBHOOK_URL is not defined in environment variables");
        }

        await fetch(this.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "📩 **New message from API**",
                embeds: [
                    {
                        title: `From: ${name} (${email})`,
                        description: message,
                        color: this.env === "development" ? 3066993 : 10656766,
                    },
                ],
            }),
        });

        logger.info("Message successfully sent to Discord");
        return res.json({
            status: "Success",
            data: "Message sent successfully",
        });
    };
}
