import { Navigation } from "@/types";
import { routes } from "./routes";

export const sideBarLinks: Array<Navigation> = [
	{
		title: "Home",
		icon: "home",
		route: routes.HOME,
	},
	{
		title: "My Summary",
		icon: "box",
		route: routes.SUMMARY,
	},
	{
		title: "Friends",
		icon: "group",
		route: routes.FRIENDS,
	},
	{
		title: "Calendar",
		icon: "calendar_month",
		route: routes.CALENDAR,
	},
];
