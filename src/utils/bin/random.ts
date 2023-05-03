export const random = async (args: string[]): Promise<number> => {
	const [min, max] = args.map((arg) => parseInt(arg, 10));
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
