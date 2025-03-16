import { AddExpenseWizard } from "@/components";
import { authRouterInterceptor } from "@/connections";
import { routes } from "@/constants";
import { Button } from "@/library";
import { useWalletStore } from "@/store";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React, { useState } from "react";

type HomePageProps = {
	user: IUser;
};

const classes = stylesConfig(styles, "home");

const HomePage: React.FC<HomePageProps> = ({ user }) => {
	const { expenses, isLoading } = useWalletStore({ syncOnMount: true });
	const [openAddWizard, setOpenAddWizard] = useState(false);
	return (
		<>
			<main>
				<span>Home</span>
				<pre>{JSON.stringify(user, null, 2)}</pre>
				<pre>
					{JSON.stringify(isLoading ? "loading" : expenses, null, 2)}
				</pre>
				<Button
					className={classes("-cta")}
					size="large"
					onClick={() => setOpenAddWizard(true)}
				>
					Add Expense
				</Button>
			</main>
			{openAddWizard ? (
				<AddExpenseWizard onClose={() => setOpenAddWizard(false)} />
			) : null}
		</>
	);
};

export default HomePage;

export const getServerSideProps = (
	context: any
): Promise<ServerSideResult<HomePageProps>> => {
	return authRouterInterceptor(context, {
		onLoggedInAndOnboarded(user) {
			return { props: { user } };
		},
		onLoggedInAndNotOnboarded() {
			return {
				redirect: {
					destination: routes.ONBOARDING + "?redirect=/home",
					permanent: false,
				},
			};
		},
		onLoggedOut() {
			return {
				redirect: {
					destination: routes.LOGIN + "?redirect=/home",
					permanent: false,
				},
			};
		},
	});
};
