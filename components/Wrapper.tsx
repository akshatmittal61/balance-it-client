import { Toaster } from "react-hot-toast";
import { AppSeo } from "@/constants";
import React from "react";
import { Seo } from "./Seo";

export const Wrapper: React.FC<any> = ({ children }) => {
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
