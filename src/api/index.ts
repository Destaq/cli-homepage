import axios from "axios";
import { xml2json } from "xml-js";
import config from "../../config.json";

export const getProjects = async () => {
	const { data } = await axios.get(
		`https://api.github.com/users/${config.social.github}/repos`,
	);

	return data;
};

export const getBio = async () => {
	const { data } = await axios.get(config.bioUrl);

	return data;
};

export const getWeather = async (city: string) => {
	const { data } = await axios.get(`https://wttr.in/${city}?ATm`);

	return data;
};

export const getQuote = async () => {
	const { data } = await axios.get("https://api.quotable.io/random");

	return {
		quote: `“${data.content}” — ${data.author}`,
	};
};

export const getSearchSuggestions = async (query: string) => {
	if (query.length > 0) {
		const url =
			`http://localhost:8010/proxy/complete/search` +
			`?output=toolbar&hl=en&q=${encodeURIComponent(query)}`;
		const { data } = await axios.get(url);

		// Convert data to JSON.
		const json = xml2json(data, { compact: true, spaces: 4 });

		// Parse JSON.
		const topLevel = JSON.parse(json).toplevel;
		if (Object.hasOwn(topLevel, "CompleteSuggestion")) {
			try {
				return JSON.parse(json).toplevel.CompleteSuggestion.map(
					(suggestion: any) => suggestion.suggestion._attributes.data,
				);
			} catch (RuntimeError) {
				return [];
			}
		} else {
			return [];
		}
	} else {
		return [];
	}
};
