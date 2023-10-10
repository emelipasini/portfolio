import { z, type SafeParseError, type SafeParseSuccess } from "zod";

export type Expense = z.infer<typeof expenseSchema>;
export type ExpenseType = z.infer<typeof ExpenseTypeSchema>;
export type ExpenseWithoutID = Omit<Expense, "id">;

export const ExpenseTypeSchema = z.enum(["Income", "Fixed", "Necessary", "Treat", "Culture", "Extra"]);
const expenseSchema = z.object({
    id: z.string().uuid(),
    description: z.string().max(100),
    amount: z.number().max(10000),
    type: ExpenseTypeSchema,
    date: z.date(),
});

export function validateExpense(
    input: ExpenseWithoutID
): SafeParseSuccess<ExpenseWithoutID> | SafeParseError<ExpenseWithoutID> {
    return expenseSchema.safeParse(input);
}

export function validatePartialExpense(
    input: Partial<Expense>
): SafeParseSuccess<Partial<Expense>> | SafeParseError<Partial<Expense>> {
    return expenseSchema.partial().safeParse(input);
}
