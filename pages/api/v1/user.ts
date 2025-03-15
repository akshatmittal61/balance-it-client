import { ApiRoute } from "@/connections";
import { UserController } from "@/controllers";

const apiRouter = new ApiRoute(
	{ POST: UserController.getUserByEmail },
	{ db: true }
);
const handler = apiRouter.getHandler();

export default handler;
