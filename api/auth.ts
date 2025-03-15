import { http } from "@/connections";
import { ApiRes, IUser } from "@/types";

export class AuthApi {
	public static async verifyUserIfLoggedIn(
		headers?: any
	): Promise<ApiRes<IUser>> {
		const res = await http.get("/auth/verify", { headers });
		return res.data;
	}
}
