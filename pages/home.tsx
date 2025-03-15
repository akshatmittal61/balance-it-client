import { authRouterInterceptor } from "@/connections";
import { routes } from "@/constants";
import { IUser, ServerSideResult } from "@/types";
import React from "react";

type HomePageProps = {
	user: IUser;
};

const HomePage: React.FC<HomePageProps> = ({ user }) => {
	return (
		<main>
			<span>Home</span>
			<pre>{JSON.stringify(user, null, 2)}</pre>
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
