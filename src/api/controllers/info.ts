import pageInfo from "../../data/page-info.json" with { type: "json" };
import profile from "../../data/profile.json" with { type: "json" };
import ContactSchema from "../../schemas/contact.js";
import logger from "../../utils/logger.js";
import { DiscordService } from "../services/discord.js";

import type { Request, Response, NextFunction } from "express";

export class InfoController {
    constructor(private readonly discordService = new DiscordService()) {}

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
            const errors = result.error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            }));

            logger.warn({ issues: errors }, "Form validation failed");
            return res.status(400).json({
                status: "Bad Request",
                errors: errors,
            });
        }

        const { name, email, message } = result.data;

        await this.discordService.sendMessageToDiscord(name, email, message);

        logger.info("Message successfully sent to Discord");
        return res.json({
            status: "Success",
            data: "Message sent successfully",
        });
    };
}
