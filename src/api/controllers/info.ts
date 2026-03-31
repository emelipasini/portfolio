import type { Request, Response, NextFunction } from "express";

import profile from "../../data/profile.json";
import pageInfo from "../../data/page-info.json";

import ContactSchema from "../../schemas/contact";

export class InfoController {
    private readonly DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    private readonly ENVIRONMENT = process.env.ENVIRONMENT;

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
        const webhookUrl = this.DISCORD_WEBHOOK_URL;

        const result = ContactSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                status: "Bad Request",
                ...result.error.format(),
            });
        }

        const { name, email, message } = result.data;

        if (name.length === 0 || email.length === 0 || message.length === 0) {
            return res.status(400).json({
                status: "Bad Request",
                data: "Missing required fields",
            });
        }

        if (webhookUrl === undefined) {
            throw new Error("WEBHOOK_URL is not defined in environment variables");
        }

        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "📩 **New message from API**",
                embeds: [
                    {
                        title: `From: ${name} (${email})`,
                        description: message,
                        color: this.ENVIRONMENT === "development" ? 3066993 : 10656766,
                    },
                ],
            }),
        });

        return res.json({
            status: "Success",
            data: "Message sent successfully",
        });
    };
}
