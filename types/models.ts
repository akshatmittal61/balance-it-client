import { IUser } from "./client";
import { T_EXPENSE_TYPE, T_USER_ROLE } from "./enum";
import { Model } from "./parser";

/**
 * User model
 * @param {string} name - Name of the user (optional - defaults to email prefix)
 * @param {string} email - Email of the user
 * @param {string} role - Role of the user - ADMIN | MEMBER | GUEST
 */
export type User = Model<{
	name?: string;
	email: string;
	role: T_USER_ROLE;
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

/**
 * Expense model
 * @param {string} title - Title of the expense
 * @param {number} amount - Amount of the expense
 * @param {string} author - Author of the expense (References User model)
 * @param {string} timestamp - Creation time of the expense
 * @param {string} group - Group id (References Group model) (optional - for group expenses)
 * @param {string[]} tags - Tags for the expense (optional)
 * @param {string} icon - Icon of the expense (optional)
 * @param {string} type - Type of the expense (Personal, Group)
 * @param {string} method - Method of the expense (Cash, Card, UPI, Netbanking)
 */
export type Expense = Model<{
	title: string;
	amount: number;
	author: IUser;
	timestamp: string;
	group?: Group;
	tags?: string[];
	icon?: string;
	type: T_EXPENSE_TYPE;
	method?: string;
}>;
