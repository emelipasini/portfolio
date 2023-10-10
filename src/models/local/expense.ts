/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/require-await */
import { type UUID, randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";

import { type Expense, type ExpenseWithoutID } from "../../schemas/expenses.js";
import expensesData from "../../data/expenses.json";

const expenses: Expense[] = expensesData as unknown as Expense[];

export class ExpenseModelLocal {
    static async saveChanges(expenses: Expense[]): Promise<void> {
        const jsonExpenses = JSON.stringify(expenses);
        await writeFile("../../data/expenses.json", jsonExpenses, "utf-8").catch((err) => {
            console.error(err);
            throw new Error("Failed to save changes.");
        });
    }

    static async getAll(): Promise<Expense[]> {
        return expenses;
    }

    static async getById(id: string): Promise<Expense | null> {
        const expense = expenses.find((e) => e.id === id);
        return expense ?? null;
    }

    static async create(input: ExpenseWithoutID): Promise<Expense> {
        const newExpense = {
            id: randomUUID(),
            ...input,
        };

        expenses.push(newExpense);
        await this.saveChanges(expenses).catch((err) => {
            console.error(err);
            throw new Error("Failed to create expense.");
        });
        return newExpense;
    }

    static async delete(id: string): Promise<boolean> {
        const expenseIndex = expenses.findIndex((e) => e.id === id);
        if (expenseIndex === -1) return false;

        expenses.splice(expenseIndex, 1);
        await this.saveChanges(expenses).catch((err) => {
            console.error(err);
            throw new Error("Failed to delete expense.");
        });
        return true;
    }

    static async update(id: UUID, input: ExpenseWithoutID): Promise<Expense | null> {
        const expenseIndex = expenses.findIndex((e) => e.id === id);
        if (expenseIndex === -1) return null;

        expenses[expenseIndex] = {
            ...expenses[expenseIndex],
            ...input,
        };

        await this.saveChanges(expenses).catch((err) => {
            console.error(err);
            throw new Error("Failed to update expense.");
        });
        return expenses[expenseIndex];
    }
}
