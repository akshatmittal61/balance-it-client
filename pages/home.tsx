import { authRouterInterceptor } from "@/connections";
import { routes } from "@/constants";
import { useWalletStore } from "@/store";
import { IUser, ServerSideResult } from "@/types";
import React from "react";

type HomePageProps = {
	user: IUser;
};

const HomePage: React.FC<HomePageProps> = ({ user }) => {
	const { expenses, isLoading } = useWalletStore({ syncOnMount: true });
	return (
		<main>
			<span>Home</span>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<pre>
				{JSON.stringify(isLoading ? "loading" : expenses, null, 2)}
			</pre>
		</main>
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
