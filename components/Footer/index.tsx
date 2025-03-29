import { AppSeo, routes, socials } from "@/constants";
import { useAuthStore } from "@/store";
import { stylesConfig } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "footer");

const Footer: React.FC = () => {
	const router = useRouter();
	const { isLoggedIn } = useAuthStore();
	return (
		<footer className={classes("")}>
			<div className={classes("-top")}>
				<div className={classes("-logo")}>
					<Image
						src={AppSeo.fullLogo}
						alt={AppSeo.title || ""}
						onClick={() => {
							router.push(isLoggedIn ? routes.HOME : routes.ROOT);
						}}
						width={1920}
						height={1080}
					/>
				</div>
				<nav className={classes("-navigation")}>
					<Link href={routes.PRIVACY_POLICY}>Privacy Policy</Link>
				</nav>
			</div>
			<hr className={classes("-divider")} />
			<div className={classes("-base")}>
				<ul className={classes("-socials")}>
					{socials.map((social) => (
						<li key={social.name}>
							<a
								href={social.href}
								target="_blank"
								rel="noreferrer"
								aria-label={social.name}
							>
								{social.icon}
							</a>
						</li>
					))}
				</ul>
				<div className={classes("-copyright")}>
					<p>
						© {new Date().getFullYear()} {AppSeo.title}. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
