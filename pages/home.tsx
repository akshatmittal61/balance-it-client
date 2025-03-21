import { AddExpenseWizard, ExpenseRow } from "@/components";
import { ExpenseTableSkeleton } from "@/components/Expenses/loader";
import { authRouterInterceptor } from "@/connections";
import { routes } from "@/constants";
import { Button, MaterialIcon } from "@/library";
import { useWalletStore } from "@/store";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

type HomePageProps = {
	user: IUser;
};

const classes = stylesConfig(styles, "home");

const HomePage: React.FC<HomePageProps> = () => {
	const { expenses, isLoading } = useWalletStore({ syncOnMount: true });
	const [openAddWizard, setOpenAddWizard] = useState(false);
	return (
		<>
			<main className={classes("")}>
				{isLoading ? (
					<ExpenseTableSkeleton />
				) : (
					<>
						{expenses.length > 0 ? (
							expenses.map((e) => (
								<ExpenseRow
									key={`home-expense-${e.id}`}
									expense={e}
								/>
							))
						) : (
							<></>
						)}
					</>
				)}
				<Button
					className={classes("-cta")}
					size="large"
					onClick={() => setOpenAddWizard(true)}
				>
					<MaterialIcon icon="add" />
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
