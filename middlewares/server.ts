import { HTTP } from "@/constants";
import { Logger } from "@/log";
import { ApiController, ApiRequest, ApiResponse } from "@/types";
import { ApiFailure, genericParse, getNonEmptyString } from "@/utils";

export class ServerMiddleware {
	public static authenticatedRoute(next: ApiController): ApiController {
		return async (req: ApiRequest, res: ApiResponse) => {
			try {
				const token = genericParse(
					getNonEmptyString,
					req.cookies.token
				);
				if (!token) {
					throw new Error("No token provided");
				}
				return next(req, res);
			} catch (error) {
				Logger.error(error);
				return ApiFailure(res).send(
					HTTP.message.UNAUTHORIZED,
					HTTP.status.UNAUTHORIZED
				);
			}
		};
	}
	public static adminRoute(next: ApiController): ApiController {
		return async (req: ApiRequest, res: ApiResponse) => {
			try {
				const role = genericParse(getNonEmptyString, req.cookies.role);
				if (role !== "admin") {
					throw new Error("Not an admin");
				}
				return next(req, res);
			} catch (error) {
				Logger.error(error);
				return ApiFailure(res).send(
					HTTP.message.FORBIDDEN,
					HTTP.status.FORBIDDEN
				);
			}
		};
	}
}
