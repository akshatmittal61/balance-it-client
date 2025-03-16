import { Pane } from "@/library";
import React from "react";

type AddExpenseWizardProps = {
	onClose: () => void;
};

export const AddExpenseWizard: React.FC<AddExpenseWizardProps> = ({
	onClose,
}) => {
	return (
		<Pane title="Add Expense" onClose={onClose}>
			add expense wizard
		</Pane>
	);
};
