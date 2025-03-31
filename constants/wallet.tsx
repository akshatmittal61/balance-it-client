import { MaterialIcon } from "@/library";
import {
	ExpensesSummary,
	T_COMPONENT_THEME,
	T_EXPENSE_METHOD,
	T_EXPENSE_TYPE,
} from "@/types";
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

export const expenseTypes: Record<
	T_EXPENSE_TYPE,
	{
		id: T_EXPENSE_TYPE;
		label: string;
		icon: React.ReactNode;
		theme: T_COMPONENT_THEME;
	}
> = {
	PAID: {
		id: "PAID",
		label: "Paid",
		icon: <MaterialIcon icon="upload" color="var(--material-red)" />,
		theme: "error",
	},
	RECEIVED: {
		id: "RECEIVED",
		label: "Received",
		icon: <MaterialIcon icon="download" color="var(--material-green)" />,
		theme: "success",
	},
	SELF: {
		id: "SELF",
		label: "Self",
		icon: <MaterialIcon icon="laps" color="var(--material-blue)" />,
		theme: "info",
	},
};

export const initialExpensesSummary: ExpensesSummary = {
	paid: 0,
	received: 0,
};
