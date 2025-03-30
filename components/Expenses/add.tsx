import { EXPENSE_TYPE, expenseMethods } from "@/constants";
import { Responsive } from "@/layouts";
import { Button, CheckBox, Input, Pane } from "@/library";
import { useAuthStore, useWalletStore } from "@/store";
import { CreateExpense, IUser, T_EXPENSE_TYPE } from "@/types";
import { enumToText, stylesConfig } from "@/utils";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import { FiChevronLeft, FiUsers, FiX } from "react-icons/fi";
import { MembersWindow } from "./splits";
import styles from "./styles.module.scss";
import { AddExpenseScreen, AddExpenseWizardProps, TagProps } from "./types";

const classes = stylesConfig(styles, "expense-wizard");

const Tag: React.FC<TagProps> = ({
	tag,
	active = true,
	onClick,
	onRemove,
	className = "",
}) => {
	return (
		<span
			className={classes(
				"-tag",
				{
					"-tag--active": active,
					"-tag--interactive": onClick !== undefined,
				},
				className
			)}
			onClick={onClick}
		>
			{tag}
			{onRemove ? <FiX onClick={onRemove} /> : null}
		</span>
	);
};

export const AddExpenseWizard: React.FC<AddExpenseWizardProps> = ({
	onClose,
}) => {
	const { user } = useAuthStore();
	const { isAdding, createExpense, tags } = useWalletStore();
	const [tagsStr, setTagsStr] = useState("");
	const [currentScreen, setCurrentScreen] =
		useState<AddExpenseScreen>("default");
	const [selectedMembers, setSelectedMembers] = useState<Array<IUser>>(
		user ? [user] : []
	);
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
		<Pane title="Add Expense" onClose={onClose} direction="bottom">
			<form onSubmit={handleSubmit} className={classes("-form")}>
				<Responsive.Row>
					{currentScreen === "default" ? (
						<>
							<Responsive.Col
								xlg={50}
								lg={50}
								md={50}
								sm={100}
								xsm={100}
							>
								<Input
									name="title"
									type="text"
									label="Title"
									placeholder="Title e.g. Food"
									value={payload.title}
									onChange={handleChange}
									required
								/>
							</Responsive.Col>
							<Responsive.Col
								xlg={50}
								lg={50}
								md={50}
								sm={100}
								xsm={100}
							>
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
							<Responsive.Col
								xlg={33}
								lg={33}
								md={50}
								sm={50}
								xsm={50}
							>
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
							<Responsive.Col
								xlg={33}
								lg={33}
								md={50}
								sm={50}
								xsm={50}
							>
								<Input
									name="type"
									type="text"
									placeholder="Type e.g. Paid"
									label="Type"
									value={enumToText(payload.type)}
									dropdown={{
										enabled: true,
										options: Object.values(
											EXPENSE_TYPE
										).map((type) => ({
											id: type,
											value: type,
											label: enumToText(type),
										})),
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
							<Responsive.Col
								xlg={100}
								lg={100}
								md={100}
								sm={100}
								xsm={100}
								className={classes("-methods")}
							>
								{Object.values(expenseMethods).map((method) => (
									<CheckBox
										key={`add-expense-payment-method-${method.id}`}
										label={
											<Image
												src={method.logo}
												alt={method.label}
												width={50}
												height={50}
												className={classes(
													"-methods-logo"
												)}
											/>
										}
										checked={payload.method === method.id}
										onChange={() => {
											setPayload((p) => ({
												...p,
												method: method.id,
											}));
										}}
									/>
								))}
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
									onChange={(e: any) =>
										setTagsStr(e.target.value)
									}
								/>
							</Responsive.Col>
							{tagsStr
								.split(",")
								.map((tag: string) => tag.trim())
								.filter(Boolean).length > 0 ? (
								<Responsive.Col
									xlg={100}
									lg={100}
									md={100}
									sm={100}
									xsm={100}
									className={classes("-tags")}
								>
									{tagsStr
										.split(",")
										.map((tag: string) => tag.trim())
										.filter(Boolean)
										.map((tag: string, index: number) => (
											<Tag
												tag={tag}
												active={true}
												key={`add-expense-tag-${index}`}
												onRemove={() => {
													const currentTags = tagsStr
														.split(",")
														.map((tag) =>
															tag.trim()
														)
														.filter(Boolean);
													setTagsStr(
														currentTags
															.filter(
																(t) => t !== tag
															)
															.join(", ")
													);
												}}
											/>
										))}
								</Responsive.Col>
							) : null}
							<Responsive.Col
								xlg={100}
								lg={100}
								md={100}
								sm={100}
								xsm={100}
								className={classes("-tags")}
							>
								{tags
									.map((tag: string) => tag.trim())
									.filter(Boolean)
									.filter(
										(tag: string) =>
											!tagsStr
												.split(",")
												.map((tag) => tag.trim())
												.includes(tag)
									)
									.map((tag: string, index: number) => (
										<Tag
											tag={tag}
											active={false}
											key={`add-expense-tag-${index}`}
											onClick={() => {
												const currentTags = tagsStr
													.split(",")
													.map((tag) => tag.trim())
													.filter(Boolean);
												if (currentTags.includes(tag))
													return;
												setTagsStr(
													[...currentTags, tag].join(
														", "
													)
												);
											}}
										/>
									))}
							</Responsive.Col>
						</>
					) : currentScreen === "splits" ? (
						<MembersWindow
							selectedMembers={selectedMembers}
							setSelectedMembers={(users) => {
								setSelectedMembers(users);
								setPayload((p) => ({
									...p,
									members: users.map((user) => user.id),
								}));
							}}
						/>
					) : null}
					<Responsive.Col
						xlg={100}
						lg={100}
						md={100}
						sm={100}
						xsm={100}
						className={classes("-action")}
					>
						{currentScreen === "default" ? (
							<Button
								type="button"
								size="large"
								variant="outlined"
								onClick={() => setCurrentScreen("splits")}
								icon={<FiUsers />}
								iconPosition="left"
							>
								Split with friends?
							</Button>
						) : (
							<Button
								type="button"
								size="large"
								variant="outlined"
								onClick={() => setCurrentScreen("default")}
								icon={<FiChevronLeft />}
								iconPosition="left"
							>
								Go back
							</Button>
						)}
						<Button type="submit" size="large" loading={isAdding}>
							Add
						</Button>
					</Responsive.Col>
				</Responsive.Row>
			</form>
		</Pane>
	);
};
