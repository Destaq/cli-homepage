import config from "../../../config.json";

export const github = async (args: string[]): Promise<string> => {
	window.open(`https://github.com/${config.social.github}/`);

	return "Opening GitHub...";
};

export const linkedin = async (args: string[]): Promise<string> => {
	window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

	return "Opening LinkedIn...";
};
