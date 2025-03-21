import {
	AddExpenseWizard,
	ExpenseRow,
	ExpensesSummaryWidget,
	Placeholder,
} from "@/components";
import { ExpenseTableSkeleton } from "@/components/Expenses/loader";
import { authRouterInterceptor } from "@/connections";
import { routes } from "@/constants";
import { Button, MaterialIcon, Typography } from "@/library";
import { useWalletStore } from "@/store";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import dayjs from "dayjs";
import React, { useState } from "react";

type HomePageProps = {
	user: IUser;
};

const classes = stylesConfig(styles, "home");

const HomePage: React.FC<HomePageProps> = () => {
	const { expenses, summary, isLoading } = useWalletStore({
		syncOnMount: true,
	});
	const [openAddWizard, setOpenAddWizard] = useState(false);
	return (
		<>
			<main className={classes("")}>
				{isLoading ? (
					<ExpenseTableSkeleton />
				) : expenses.length > 0 ? (
					<>
						<section className={classes("-expenses")}>
							{expenses.map((e) => (
								<ExpenseRow
									key={`home-expense-${e.id}`}
									expense={e}
								/>
							))}
						</section>
						<section className={classes("-summary")}>
							<div className={classes("-current")}>
								<Typography>
									{dayjs().format(
										"dddd, DD MMMM YYYY, h:mm A"
									)}
								</Typography>
							</div>
							<ExpensesSummaryWidget summary={summary} />
						</section>
					</>
				) : (
					<Placeholder action={() => setOpenAddWizard(true)} />
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
