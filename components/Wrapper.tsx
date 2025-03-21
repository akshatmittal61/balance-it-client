import { AppSeo, routes } from "@/constants";
import { useAuthStore } from "@/store";
import { IUser } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "./Header";
import { Seo } from "./Seo";

interface WrapperProps {
	children: React.ReactNode;
	user?: IUser;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, user }) => {
	const router = useRouter();
	const { setUser } = useAuthStore();
	const showHeaderOn: Array<string> = [routes.HOME];
	useEffect(() => {
		if (user) {
			setUser(user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

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
			{showHeaderOn.includes(router.pathname) ? <Header /> : null}
			{children}
			<Toaster position="top-center" />
		</>
	);
};
