import { EXPENSE_TYPE } from "@/constants";
import { Typography } from "@/library";
import { Expense } from "@/types";
import { stylesConfig } from "@/utils";
import dayjs from "dayjs";
import React from "react";
import styles from "./styles.module.scss";

type ExpenseRowProps = {
	expense: Expense;
};

const classes = stylesConfig(styles, "expense-row");

export const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense }) => {
	return (
		<div className={classes("")}>
			<div className={classes("-top")}>
				<Typography
					size="lg"
					weight="medium"
					className={classes("-title")}
				>
					{expense.title}
				</Typography>
				<Typography
					size="xl"
					className={classes("-amount", {
						"-amount--paid": expense.type === EXPENSE_TYPE.PAID,
						"-amount--received":
							expense.type === EXPENSE_TYPE.RECEIVED,
					})}
				>
					{expense.amount}
				</Typography>
			</div>
			<div className={classes("-bottom")}>
				<Typography size="s" className={classes("-date")}>
					{dayjs(expense.timestamp).format("DD MMM - HH:mm")}
				</Typography>
				<div className={classes("-method")}>{expense.method}</div>
			</div>
		</div>
	);
};
