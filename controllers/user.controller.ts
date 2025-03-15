import { UserService } from "@/services";
import { ApiRequest, ApiResponse } from "@/types";
import { ApiSuccess, genericParse, getNonEmptyString } from "@/utils";

export class UserController {
	public static async getUserByEmail(req: ApiRequest, res: ApiResponse) {
		const email = genericParse(getNonEmptyString, req.query.email);
		const user = await UserService.getUserByEmail(email);
		return ApiSuccess(res).send(user);
	}
}
