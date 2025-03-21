import { AuthApi } from "@/api";
import { cache, getCacheKey } from "@/cache";
import { cacheParameter } from "@/constants";
import { ServerSideAuthInterceptor } from "@/types";

export const authRouterInterceptor: ServerSideAuthInterceptor = async (
	context: any,
	{ onLoggedInAndNotOnboarded, onLoggedInAndOnboarded, onLoggedOut }
) => {
	const { req } = context;
	const cookies = req.cookies;
	if (!cookies.accessToken || !cookies.refreshToken) {
		return onLoggedOut();
	}
	try {
		const headers = { cookie: req.headers.cookie };
		const cacheKey = getCacheKey(cacheParameter.USER, {
			token: cookies.accessToken,
		});
		const { data: user } = await cache.fetch(cacheKey, () =>
			AuthApi.verifyUserIfLoggedIn(headers)
		);
		if (user.name) {
			return onLoggedInAndOnboarded(user, headers);
		} else {
			return onLoggedInAndNotOnboarded(user, headers);
		}
	} catch (error: any) {
		return onLoggedOut();
	}
};
