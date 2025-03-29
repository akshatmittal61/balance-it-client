import { appTheme, sideBarLinks } from "@/constants";
import { AppNetworkStatus, AppTheme, Navigation } from "@/types";
import { hexToRgb, Notify } from "@/utils";
import { useEffect } from "react";
import { create } from "zustand";
import { createSelectors } from "./utils";

type State = {
	vh: number;
	theme: AppTheme;
	accentColor: string;
	isSidebarExpanded: boolean;
	networkStatus: AppNetworkStatus;
	sideBarLinks: Array<Navigation>;
};

type Getter<T extends keyof State> = () => State[T];
type Setter<T extends keyof State> = (_: State[T]) => void;

type Action = {
	getVh: Getter<"vh">;
	getTheme: Getter<"theme">;
	getAccentColor: Getter<"accentColor">;
	getIsSidebarExpanded: Getter<"isSidebarExpanded">;
	getNetworkStatus: Getter<"networkStatus">;
	getSideBarLinks: Getter<"sideBarLinks">;
	setVh: Setter<"vh">;
	setTheme: Setter<"theme">;
	setAccentColor: Setter<"accentColor">;
	setIsSidebarExpanded: Setter<"isSidebarExpanded">;
	setNetworkStatus: Setter<"networkStatus">;
	setSideBarLinks: Setter<"sideBarLinks">;
};

type Store = State & Action;

const store = create<Store>((set, get) => {
	return {
		vh: 0,
		theme: appTheme.light,
		accentColor: "0, 0, 0",
		isSidebarExpanded: true,
		networkStatus: "online",
		sideBarLinks: sideBarLinks,
		getVh: () => get().vh,
		getTheme: () => get().theme,
		getAccentColor: () => get().accentColor,
		getIsSidebarExpanded: () => get().isSidebarExpanded,
		getNetworkStatus: () => get().networkStatus,
		getSideBarLinks: () => get().sideBarLinks,
		setVh: (vh) => set({ vh }),
		setTheme: (theme) => {
			set({ theme });
			document.body.dataset.theme = theme;
			localStorage.setItem("theme", theme);
		},
		setAccentColor: (accentColor) => set({ accentColor }),
		setIsSidebarExpanded: (isSidebarExpanded) => set({ isSidebarExpanded }),
		setNetworkStatus: (networkStatus) => set({ networkStatus }),
		setSideBarLinks: (sideBarLinks) => set({ sideBarLinks }),
	};
});

const useStore = createSelectors(store);

type Options = {
	syncOnMount?: boolean;
};

type ReturnType = Store & {
	sync: () => void;
	syncNetworkStatus: () => void;
	toggleTheme: () => void;
	toggleSidebar: () => void;
	setOpenSidebar: (_: boolean) => void;
};

type UiStoreHook = (_?: Options) => ReturnType;

export const useUiStore: UiStoreHook = (options = {}) => {
	const store = useStore();

	const syncTheme = () => {
		const theme = localStorage.getItem("theme");
		if (theme && ["light", "dark"].includes(theme)) {
			store.setTheme(theme as AppTheme);
		} else {
			const h = window.matchMedia("(prefers-color-scheme: dark)");
			if (h.matches) {
				store.setTheme(appTheme.dark);
			} else {
				store.setTheme(appTheme.light);
			}
		}
		const accentColor = getComputedStyle(document.documentElement)
			.getPropertyValue("--accent-color-heavy")
			.trim();
		const accentColorRgb = hexToRgb(accentColor);
		store.setAccentColor(accentColorRgb);
	};

	const syncNetworkStatus = () => {
		const status = navigator.onLine ? "online" : "offline";
		store.setNetworkStatus(status);
		if (status === "offline") {
			Notify.error("You are offline");
		}
	};

	const sync = () => {
		syncTheme();
		syncNetworkStatus();
	};

	const toggleTheme = () => {
		if (store.theme === appTheme.light) {
			store.setTheme(appTheme.dark);
		} else {
			store.setTheme(appTheme.light);
		}
	};

	const setOpenSidebar = (state: boolean) => {
		if (state === true) {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-expanded)"
			);
		} else {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-collapsed)"
			);
		}
		store.setIsSidebarExpanded(state);
	};

	const toggleSidebar = () => {
		if (store.isSidebarExpanded) {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-collapsed)"
			);
		} else {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-expanded)"
			);
		}
		store.setIsSidebarExpanded(!store.isSidebarExpanded);
	};

	useEffect(() => {
		if (options.syncOnMount) {
			sync();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options.syncOnMount]);

	return {
		...store,
		sync,
		syncNetworkStatus,
		toggleTheme,
		toggleSidebar,
		setOpenSidebar,
	};
};
