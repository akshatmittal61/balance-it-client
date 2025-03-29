import { Footer, Header, SideBar } from "@/components";
import { AppSeo, routes } from "@/constants";
import { useDevice } from "@/hooks";
import { Logger } from "@/log";
import { useAuthStore, useUiStore } from "@/store";
import { IUser } from "@/types";
import { stylesConfig } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Seo } from "../Seo";
import styles from "./styles.module.scss";

interface WrapperProps {
	children: React.ReactNode;
	user?: IUser;
}
const classes = stylesConfig(styles, "wrapper");

export const Wrapper: React.FC<WrapperProps> = ({ children, user }) => {
	const { setUser } = useAuthStore();
	const { syncNetworkStatus, setOpenSidebar } = useUiStore();
	const router = useRouter();
	const { device } = useDevice();
	const pagesSupportingHeader: Array<string> = [
		routes.ERROR,
		routes.PRIVACY_POLICY,
		routes.HOME,
		routes.PROFILE,
	];
	const pagesSupportingFooter: Array<string> = [
		routes.ROOT,
		routes.ERROR,
		routes.PRIVACY_POLICY,
	];
	const pagesSupportingContainer: Array<string> = [
		routes.HOME,
		routes.SUMMARY,
		routes.FRIENDS,
		routes.CALENDAR,
		routes.PROFILE,
	];
	useEffect(() => {
		Logger.debug("Setting user", user);
		if (user) {
			setUser(user);
		}
		setInterval(() => {
			syncNetworkStatus();
		}, 10000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (device === "mobile") {
			setOpenSidebar(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [device, router.pathname]);

	return (
		<>
			<Seo
				title={AppSeo.title}
				description={AppSeo.description}
				image={AppSeo.image}
				canonical={AppSeo.canonical}
				themeColor={AppSeo.themeColor}
				icons={AppSeo.icons}
				twitter={AppSeo.twitter}
				og={AppSeo.og}
			/>
			{pagesSupportingHeader.includes(router.pathname) ? (
				<Header />
			) : null}
			{pagesSupportingContainer.includes(router.pathname) ? (
				<SideBar />
			) : null}
			<main
				className={
					pagesSupportingContainer.includes(router.pathname)
						? classes("")
						: ""
				}
			>
				{children}
			</main>
			{pagesSupportingFooter.includes(router.pathname) ? (
				<Footer />
			) : null}
			<Toaster position="top-center" />
		</>
	);
};
