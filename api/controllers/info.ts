import type { Request, Response } from "express";

import profile from "../data/profile.json";

export const InfoController = {
    profile: (_req: Request, res: Response): void => {
        res.json({
            status: "success",
            data: profile,
        });
    },
};
