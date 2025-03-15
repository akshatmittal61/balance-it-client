import { http } from "@/connections";
import { ApiRes, Expense } from "@/types";

export class WalletApi {
	public static async getUserExpenses(
		headers?: any
	): Promise<ApiRes<Array<Expense>>> {
		const res = await http.get("/wallet/expenses", { headers });
		return res.data;
	}
}
