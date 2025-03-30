import { ExpensesSummary, T_EXPENSE_METHOD } from "@/types";
import { frontendBaseUrl } from "./variables";

export const expenseMethods: Record<
	T_EXPENSE_METHOD,
	{ id: T_EXPENSE_METHOD; label: string; logo: string }
> = {
	UPI: {
		id: "UPI",
		label: "UPI",
		logo: `${frontendBaseUrl}/vectors/upi-logo.svg`,
	},
	CASH: {
		id: "CASH",
		label: "Cash",
		logo: `${frontendBaseUrl}/vectors/cash-logo.svg`,
	},
	CARD: {
		id: "CARD",
		label: "Card",
		logo: `${frontendBaseUrl}/images/card-logo.png`,
	},
	NETBANKING: {
		id: "NETBANKING",
		label: "Netbanking",
		logo: `${frontendBaseUrl}/images/netbanking-logo.png`,
	},
};

export const initialExpensesSummary: ExpensesSummary = {
	paid: 0,
	received: 0,
};
