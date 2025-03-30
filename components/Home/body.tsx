import { ExpenseRow } from "@/components";
import { useWalletStore } from "@/store";
import { stylesConfig } from "@/utils";
import React from "react";
import styles from "./styles.module.scss";

type HomeBodyProps = {};

const classes = stylesConfig(styles, "home-body");

export const HomeBody: React.FC<HomeBodyProps> = () => {
	const { expenses } = useWalletStore();
	return (
		<div className={classes("")}>
			{expenses.map((expense) => (
				<ExpenseRow
					key={`group-expense-${expense.id}`}
					expense={expense}
				/>
			))}
		</div>
	);
};
