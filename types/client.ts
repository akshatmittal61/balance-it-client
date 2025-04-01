import { Expense, User } from "./models";
import { CreateModel } from "./parser";

export type IUser = Omit<User, "createdAt" | "updatedAt">;

export type CreateExpense = Omit<CreateModel<Expense>, "author" | "splits"> & {
	author: string;
	splits?: Array<{ user: string; amount: number }>;
};

export type ExpensesSummary = {
	paid: number;
	received: number;
};

export type Friend = IUser & {
	strings: number;
};
