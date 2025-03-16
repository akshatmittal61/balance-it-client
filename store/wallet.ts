import { WalletApi } from "@/api";
import { Logger } from "@/log";
import { CreateExpense, Expense } from "@/types";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createSelectors } from "./utils";

type State = {
	expenses: Array<Expense>;
};

type Setter<T extends keyof State> = (_: State[T]) => void;

type Action = {
	setExpenses: Setter<"expenses">;
};

type Store = State & Action;

const store = create<Store>((set, get) => {
	return {
		expenses: [],
		getExpenses: () => get().expenses,
		setExpenses: (expenses) => set({ expenses }),
	};
});

const useStore = createSelectors(store);

type Options = {
	syncOnMount?: boolean;
};

type ReturnType = Store & {
	isLoading: boolean;
	isAdding: boolean;
	sync: () => void;
	createExpense: (_: CreateExpense) => Promise<void>;
};

type WalletStoreHook = (_?: Options) => ReturnType;

export const useWalletStore: WalletStoreHook = (options = {}) => {
	const store = useStore();
	const [isLoading, setIsLoading] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	const sync = async () => {
		try {
			setIsLoading(true);
			const res = await WalletApi.getUserExpenses();
			store.setExpenses(res.data);
		} catch {
			store.setExpenses([]);
		} finally {
			setIsLoading(false);
		}
	};

	const createExpense = async (expense: CreateExpense) => {
		try {
			setIsAdding(true);
			const created = await WalletApi.createExpense(expense);
			store.setExpenses([created.data, ...store.expenses]);
		} catch (err) {
			Logger.error(err);
		} finally {
			setIsAdding(false);
		}
	};

	useEffect(() => {
		if (options.syncOnMount) {
			sync();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options.syncOnMount]);

	return {
		...store,
		isLoading,
		isAdding,
		sync,
		createExpense,
	};
};
