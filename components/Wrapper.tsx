import { Toaster } from "react-hot-toast";
import { AppSeo } from "@/constants";
import React, { useEffect } from "react";
import { Seo } from "./Seo";
import { IUser } from "@/types";
import { useAuthStore } from "@/store";

interface WrapperProps {
	children: React.ReactNode;
	user?: IUser;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, user }) => {
	const { setUser } = useAuthStore();
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
			{children}
			<Toaster position="top-center" />
		</>
	);
};
