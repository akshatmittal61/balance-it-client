import { EXPENSE_TYPE, fallbackAssets } from "@/constants";
import { Avatars, Typography } from "@/library";
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
		<>
			<div
				className={classes("")}
				// onClick={() => setOpenViewExpensePopup(true)}
			>
				<Typography className={classes("-date")}>
					{dayjs(expense.timestamp).format("MMM DD, HH:mm")}
				</Typography>
				<Typography className={classes("-title")}>
					{expense.title}
				</Typography>
				{expense.splits && expense.splits.length > 0 ? (
					<div className={classes("-splits")}>
						<Avatars size={36}>
							{expense.splits.map((exp) => ({
								src: exp.user.avatar || fallbackAssets.avatar,
								alt:
									(exp.user.name ||
										exp.user.email.split("@")[0]) +
									" - " +
									(exp.pending + exp.completed),
							}))}
						</Avatars>
					</div>
				) : null}
				<Typography
					weight="medium"
					className={classes("-amount", {
						"-amount--paid": expense.type === EXPENSE_TYPE.PAID,
						"-amount--received":
							expense.type === EXPENSE_TYPE.RECEIVED,
					})}
				>
					{expense.amount}
				</Typography>
			</div>
		</>
	);
};
