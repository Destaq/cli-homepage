import { getWeather } from "../../api";

export const weather = async (args: string[]): Promise<string> => {
	const city = args.join("+");

	if (!city) {
		return "Usage: weather [city]. Example: weather casablanca";
	}

	return await getWeather(city);
};
