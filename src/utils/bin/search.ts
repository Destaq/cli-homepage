import { getSearchSuggestions } from "../../api";

export const searchSuggestions = async (args: string[]): Promise<string> => {
	if (args.length === 0) {
		return `Usage: search [query]`;
	} else {
		const searchSuggestions: string[] = await getSearchSuggestions(
			args.join(" "),
		);
		// Limit searchSuggestions to 9 items, cut it off from afterward
		if (searchSuggestions.length > 9) {
			searchSuggestions.length = 9;
		}
		return searchSuggestions
			.map(
				(suggestion, index) =>
					`${
						index + 1
					} - <a class="text-light-blue dark:text-dark-blue underline" href="${`https://www.google.com/search?q=${suggestion}`}" target="_blank">${suggestion}</a>`,
			)
			.join("\n");
	}
};

export const search = async (args: string[]): Promise<string> => {
	setTimeout(function () {
		window.open(
			`https://www.google.com/search?q=${args.join(" ")}`,
			"_blank",
		);
	}, 500);

	return "Opening Google Search...";
};
