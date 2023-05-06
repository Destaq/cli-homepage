import * as bin from "./bin";
import { Theme } from "../interfaces/theme";

export const handleTabCompletion = (
	command: string,
	setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
	const commands = Object.keys(bin).filter((entry) =>
		entry.startsWith(command),
	);

	if (commands.length === 1) {
		setCommand(commands[0]);
	}
};

export const handleDynamicChoice = (
	output: string,
	selection: number,
	theme: Theme,
): [string, number] => {
	// 	Split choices into individual elements.
	let choices = output.split("\n");
	if (selection > choices.length - 1) {
		selection = 0;
	}

	const regex = /style="(.*?)"/gm;

	// Unwrap span tags.
	choices = choices.map((choice) => {
		return choice
			.replace(/<span >/g, "")
			.replace(/<span>/g, "")
			.replace(/<\/span>/g, "")
			.replace(regex, "");
	});

	// Add the class 'selected' to the selected choice element and update colors.
	choices = choices.map((choice, index) => {
		if (index === selection) {
			return `<span style="background: ${theme.foreground}; color: ${theme.background}">${choice}</span>`;
		} else {
			return `<span>${choice}</span>`;
		}
	});

	return [choices.join("\n"), ++selection];
};
