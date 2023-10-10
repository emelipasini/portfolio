/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { ExpenseController } from "../controllers/expenses";

export const expensesRouter = Router();

const expenseController = new ExpenseController();

expensesRouter.get("/", expenseController.getAll);
