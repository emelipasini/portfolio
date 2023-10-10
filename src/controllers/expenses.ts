import { type Request, type Response } from "express";

import { ExpenseModelLocal } from "../models/local/expense";

export class ExpenseController {
    expenseModel: typeof ExpenseModelLocal;

    constructor() {
        this.expenseModel = ExpenseModelLocal;
    }

    getAll = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const expenses = await this.expenseModel.getAll();
            return res.json(expenses);
        } catch (error) {
            return res.status(500).json({ error: "Failed to get all expenses." });
        }
    };
}
