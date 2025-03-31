import { IUser } from "./client";
import { T_EXPENSE_METHOD, T_EXPENSE_TYPE, T_USER_STATUS } from "./enum";
import { Model } from "./parser";

/**
 * User model
 * @param {string} name - Name of the user (optional - defaults to email prefix)
 * @param {string} email - Email of the user
 * @param {string} phone - Phone number of the user (optional)
 * @param {string} avatar - Avatar of the user (optional)
 * @param {string} status - Status of the user (Joined, Invited)
 * @param {string} invitedBy - Id of the user who invited the user (References User model) (optional - for invited users)
 */
export type User = Model<{
	name?: string;
	email: string;
	phone?: string;
	avatar?: string;
	status: T_USER_STATUS;
	invitedBy?: string;
}>;

/**
 * Group model
 * @param {string} name - Name of the group
 * @param {string} icon - Icon of the group (optional)
 * @param {string} banner - Banner of the group (optional)
 * @param {string[]} tags - Tags of the group
 * @param {string} author - Author of the group (References User model)
 */
export type Group = Model<{
	name: string;
	icon?: string;
	banner?: string;
	tags?: string[];
	author: IUser;
}>;

type SplitWithoutExpense = Model<{
	user: IUser;
	pending: number;
	completed: number;
}>;

/**
 * Expense model
 * @param {string} title - Title of the expense
 * @param {number} amount - Amount of the expense
 * @param {string} author - Author of the expense (References User model)
 * @param {string} timestamp - Creation time of the expense
 * @param {string} description - Description of the expense (optional)
 * @param {string} group - Group id (References Group model) (optional - for group expenses)
 * @param {string[]} tags - Tags for the expense (optional)
 * @param {string} icon - Icon of the expense (optional)
 * @param {string} type - Type of the expense (Paid, Received, Self)
 * @param {string} method - Method of the expense (Cash, Card, UPI, Netbanking)
 */
export type Expense = Model<{
	title: string;
	amount: number;
	author: IUser;
	timestamp: string;
	description?: string;
	group?: Group;
	tags?: string[];
	icon?: string;
	type: T_EXPENSE_TYPE;
	method?: T_EXPENSE_METHOD;
	splits?: Array<SplitWithoutExpense>;
}>;

/**
 * Split model - When a user splits an expense
 * @param {string} expense - Expense id (References Expense model)
 * @param {string} user - User id (References User model)
 * @param {number} pending - Pending amount
 * @param {number} completed - Completed amount
 */
export type Split = SplitWithoutExpense & {
	expense: Expense;
};
