import { Expense, User } from "./models";
import { CreateModel } from "./parser";

export type IUser = Omit<User, "createdAt" | "updatedAt">;

export type CreateExpense = Omit<CreateModel<Expense>, "author"> & {
	author: string;
};

export type ExpensesSummary = {
	paid: number;
	received: number;
};
