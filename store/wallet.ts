import { WalletApi } from "@/api";
import { Expense } from "@/types";
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
	sync: () => void;
};

type WalletStoreHook = (_?: Options) => ReturnType;

export const useWalletStore: WalletStoreHook = (options = {}) => {
	const store = useStore();
	const [isLoading, setIsLoading] = useState(false);

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

	useEffect(() => {
		if (options.syncOnMount) {
			sync();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options.syncOnMount]);

	return {
		...store,
		isLoading,
		sync,
	};
};
