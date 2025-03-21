import { EXPENSE_TYPE, expenseMethods } from "@/constants";
import { Responsive } from "@/layouts";
import { Button, Input, Pane } from "@/library";
import { useAuthStore, useWalletStore } from "@/store";
import { CreateExpense, T_EXPENSE_TYPE } from "@/types";
import { enumToText, slugify, stylesConfig } from "@/utils";
import dayjs from "dayjs";
import React, { useState } from "react";
import styles from "./styles.module.scss";

type AddExpenseWizardProps = {
	onClose: () => void;
};

const classes = stylesConfig(styles, "expense-wizard");

const Tag: React.FC<{ tag: string }> = ({ tag }) => {
	return (
		<div className={classes("-tag")}>
			<span>{tag}</span>
		</div>
	);
};

export const AddExpenseWizard: React.FC<AddExpenseWizardProps> = ({
	onClose,
}) => {
	const { user } = useAuthStore();
	const { isAdding, createExpense } = useWalletStore();
	const [tagsStr, setTagsStr] = useState("");
	const [payload, setPayload] = useState<CreateExpense>({
		title: "",
		amount: 0,
		tags: [],
		timestamp: new Date().toISOString(),
		icon: "",
		type: EXPENSE_TYPE.PAID,
		method: "UPI",
		author: user ? user.id : "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		if (name === "timestamp") {
			setPayload((p) => ({
				...p,
				[name]: new Date(value).toISOString(),
			}));
		} else if (name === "amount") {
			setPayload((p) => ({
				...p,
				[name]: Number(value),
			}));
		} else {
			setPayload((p) => ({ ...p, [name]: value }));
		}
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		payload.tags = tagsStr
			.split(",")
			.map((tag) => tag.trim())
			.filter(Boolean);
		await createExpense(payload).then(() => {
			onClose();
		});
	};
	return (
		<Pane title="Add Expense" onClose={onClose}>
			<form onSubmit={handleSubmit} className={classes("-form")}>
				<Responsive.Row>
					<Responsive.Col xlg={50} lg={50} md={50} sm={100} xsm={100}>
						<Input
							name="title"
							type="text"
							label="ExpenseTitle"
							placeholder="Title e.g. Food"
							value={payload.title}
							onChange={handleChange}
							required
						/>
					</Responsive.Col>
					<Responsive.Col xlg={50} lg={50} md={50} sm={100} xsm={100}>
						<Input
							name="amount"
							type="number"
							label="Amount"
							placeholder="Amount e.g. 100"
							value={payload.amount}
							onChange={handleChange}
							required
						/>
					</Responsive.Col>
					<Responsive.Col xlg={33} lg={33} md={50} sm={100} xsm={100}>
						<Input
							name="timestamp"
							type="datetime-local"
							placeholder=""
							label="Date / Time"
							value={dayjs(payload.timestamp).format(
								"YYYY-MM-DDTHH:mm"
							)}
							onChange={handleChange}
							required
						/>
					</Responsive.Col>
					<Responsive.Col xlg={33} lg={33} md={50} sm={50} xsm={50}>
						<Input
							name="type"
							type="text"
							placeholder="Type e.g. Paid"
							label="Type"
							value={enumToText(payload.type)}
							dropdown={{
								enabled: true,
								options: Object.values(EXPENSE_TYPE).map(
									(type) => ({
										id: type,
										value: type,
										label: enumToText(type),
									})
								),
								onSelect: (option) => {
									setPayload((p) => ({
										...p,
										type: option.id as T_EXPENSE_TYPE,
									}));
								},
							}}
							required
						/>
					</Responsive.Col>
					<Responsive.Col xlg={33} lg={33} md={50} sm={50} xsm={50}>
						<Input
							name="method"
							type="text"
							placeholder="Method e.g. Cash"
							label="Method"
							value={payload.method}
							dropdown={{
								enabled: true,
								options: expenseMethods.map((m) => ({
									id: slugify(m),
									value: m,
									label: m,
								})),
								onSelect: (option) => {
									setPayload((p) => ({
										...p,
										method: option.value,
									}));
								},
							}}
						/>
					</Responsive.Col>
					<Responsive.Col
						xlg={100}
						lg={100}
						md={100}
						sm={100}
						xsm={100}
					>
						<Input
							name="tagsStr"
							type="text"
							label="Tags"
							placeholder="Title e.g. Food, Travel, Grocery"
							value={tagsStr}
							onChange={(e: any) => setTagsStr(e.target.value)}
						/>
					</Responsive.Col>
					<Responsive.Col
						xlg={100}
						lg={100}
						md={100}
						sm={100}
						xsm={100}
					>
						<div className={classes("-tags")}>
							{tagsStr
								.split(",")
								.map((tag: string) => tag.trim())
								.filter(Boolean)
								.map((tag: string, index: number) => (
									<Tag
										tag={tag}
										key={`add-expense-tag-${index}`}
									/>
								))}
						</div>
					</Responsive.Col>
					<Responsive.Col
						xlg={100}
						lg={100}
						md={100}
						sm={100}
						xsm={100}
					>
						<Button size="large" loading={isAdding}>
							Add
						</Button>
					</Responsive.Col>
				</Responsive.Row>
			</form>
		</Pane>
	);
};
