import { AppSeo, routes } from "@/constants";
import { Button, Typography } from "@/library";
import { stylesConfig } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./styles.module.scss";

interface IHeroProps {}

const classes = stylesConfig(styles, "home-hero");

export const Hero: React.FC<IHeroProps> = () => {
	const router = useRouter();
	return (
		<section className={classes("")}>
			<div className={classes("-container")}>
				<div className={classes("-logo")}>
					<Image
						className={classes("-container__logo")}
						src="/favicon.svg"
						alt="logo"
						width={512}
						height={512}
					/>
				</div>
				<div className={classes("-content")}>
					<Typography
						className={classes("-container__heading")}
						family="alice"
						size="head-1"
						weight="bold"
						as="h1"
					>
						{AppSeo.title} ✨
					</Typography>
					<Typography
						className={classes("-container__subheading")}
						size="xl"
						as="p"
					>
						{AppSeo.description}
					</Typography>
					<Button
						size="large"
						icon={<AiOutlineArrowRight />}
						iconPosition="right"
						onClick={() => {
							router.push(routes.LOGIN);
						}}
					>
						Get Started Today
					</Button>
				</div>
			</div>
			<Image
				src="/images/chaotic-parade.png"
				alt="chaotic-parade"
				width={1920}
				height={1080}
				className={classes("-image")}
			/>
		</section>
	);
};
