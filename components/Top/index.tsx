import { routes } from "@/constants";
import { MaterialIcon, Typography } from "@/library";
import { stylesConfig } from "@/utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./styles.module.scss";

type TopBarProps = {
	title: string;
};

const classes = stylesConfig(styles, "top-bar");

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
	const router = useRouter();
	const [, setOpenOptions] = useState(false);
	return (
		<>
			<div className={classes("")}>
				<div className={classes("-left")}>
					<button
						className={classes("-action")}
						onClick={() => router.push(routes.HOME)}
					>
						<MaterialIcon icon="chevron_left" />
					</button>
					<div className={classes("-info")}>
						<Typography
							size="xxl"
							as="h2"
							weight="medium"
							className={classes("-name")}
						>
							{title}
						</Typography>
					</div>
				</div>
				<div className={classes("-right")}>
					<div className={classes("-options")}>
						<button
							className={classes("-action")}
							onClick={() => setOpenOptions(true)}
						>
							<MaterialIcon icon="more_vert" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
