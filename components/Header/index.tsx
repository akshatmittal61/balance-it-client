import { AppSeo, fallbackAssets, routes } from "@/constants";
import { Avatar, Typography } from "@/library";
import { useAuthStore } from "@/store";
import { stylesConfig } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

type HeaderProps = {};

const classes = stylesConfig(styles, "header");

export const Header: React.FC<HeaderProps> = () => {
	const { user } = useAuthStore();
	return (
		<>
			<header className={classes("")}>
				<Link className={classes("-home")} href={routes.HOME}>
					<Image
						src={AppSeo.fullLogo}
						alt={AppSeo.title || ""}
						width={1920}
						height={1080}
					/>
				</Link>
				{user ? (
					<div className={classes("-user")}>
						<Typography size="sm">
							{user.name || user.email.split("@")[0]}
						</Typography>
						<Avatar
							src={user.avatar || fallbackAssets.avatar}
							alt={user.name || user.email}
							size={20}
						/>
					</div>
				) : null}
			</header>
		</>
	);
};
