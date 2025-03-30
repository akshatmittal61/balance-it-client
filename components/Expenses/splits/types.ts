import { IUser } from "@/types";

export type DistributionMethod = "equal" | "percentage" | "fraction" | "custom";

export type MembersWindowProps = {
	selectedMembers: Array<IUser>;
	setSelectedMembers: (_: Array<IUser>) => void;
};

export type MembersUserProps = IUser & {
	index: number;
	isSelected?: boolean;
	onSelect?: () => void;
	onRemove?: () => void;
};

export type SplitsPlaceholderProps = {
	loading: boolean;
	searchStr: string;
	onInvited: (_: IUser) => void;
};

export type BulkEditorProps = {
	selectedMembers: Array<IUser>;
	setSelectedMembers: (_: Array<IUser>) => void;
};

export type ExpenseUser = IUser & {
	selected: boolean;
	amount: number;
	value: number | string;
};
