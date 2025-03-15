import { http } from "@/connections";
import { ApiRes, IUser } from "@/types";

export class UserApi {
	public static async updateUser(
		data: Partial<IUser>
	): Promise<ApiRes<IUser>> {
		const response = await http.patch("/profile", data);
		return response.data;
	}
}
