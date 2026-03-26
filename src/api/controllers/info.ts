import type { Request, Response } from "express";

import profile from "../../data/profile.json";
import pageInfo from "../../data/page-info.json";

export class InfoController {
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
}
