import { getEnumeration, stylesConfig } from "@/utils";
import { DistributionMethod } from "./types";
import styles from "./styles.module.scss";

export const classes = stylesConfig(styles, "splits");

export const distributionMethods = getEnumeration<DistributionMethod>([
	"equal",
	"percentage",
	"fraction",
	"custom",
]);
