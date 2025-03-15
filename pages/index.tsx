import { Home } from "@/components";
import styles from "@/styles/pages/Home.module.scss";
import { stylesConfig } from "@/utils";
import React from "react";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	return (
		<main className={classes("")}>
			<Home.Hero />
		</main>
	);
};

export default HomePage;
