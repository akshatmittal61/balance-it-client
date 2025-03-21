import { http } from "@/connections";
import { ApiRes, CreateExpense, Expense, ExpensesSummary } from "@/types";

export class WalletApi {
	public static async getUserExpenses(
		headers?: any
	): Promise<ApiRes<Array<Expense>>> {
		const res = await http.get("/wallet/expenses", { headers });
		return res.data;
	}
	public static async getExpensesSummary(
		headers?: any
	): Promise<ApiRes<ExpensesSummary>> {
		const res = await http.get("/wallet/expenses/summary", { headers });
		return res.data;
	}
	public static async createExpense(
		payload: CreateExpense,
		headers?: any
	): Promise<ApiRes<Expense>> {
		const res = await http.post("/wallet/expenses", payload, { headers });
		return res.data;
	}
}
