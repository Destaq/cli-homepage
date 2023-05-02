import { getBio } from "../../api";

export const about = async (args: string[]): Promise<string> => {
	return await getBio();
};
