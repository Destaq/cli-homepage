import packageJson from "../../../package.json";
import * as bin from "./index";

export const help = async (args: string[]): Promise<string> => {
	const commands = Object.keys(bin).sort().join(", ");

	return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command.`;
};

export const echo = async (args: string[]): Promise<string> => {
	return args.join(" ");
};

export const whoami = async (args: string[]): Promise<string> => {
	return "guest";
};

export const date = async (args: string[]): Promise<string> => {
	return new Date().toString();
};

export const email = async (args: string[]): Promise<string> => {
	window.open("mail.google.com");

	return "Opening Gmail...";
};

export const sudo = async (args?: string[]): Promise<string> => {
	setTimeout(function() {
		window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
	}, 1000);

	return `Permission denied: unable to run the command '${args[0]}' as root.`;
};

export const repo = async (args?: string[]): Promise<string> => {
	setTimeout(function() {
		window.open("https://github.com/Destaq/cli-homepage", "_blank");
	}, 1000);

	return "Opening repository...";
};

export const banner = (args?: string[]): string => {
	return `
███╗   ███╗██╗  ██╗████████╗████████╗███████╗██████╗
████╗ ████║██║  ██║╚══██╔══╝╚══██╔══╝╚════██║╚════██╗
██╔████╔██║███████║   ██║      ██║       ██╔╝ █████╔╝
██║╚██╔╝██║╚════██║   ██║      ██║      ██╔╝ ██╔═══╝
██║ ╚═╝ ██║     ██║   ██║      ██║      ██║  ███████╗
╚═╝     ╚═╝     ╚═╝   ╚═╝      ╚═╝      ╚═╝  ╚══════╝ v${packageJson.version}

Type 'help' to see list of available commands.

--
The project is open-source 🎉 type 'repo' to check out the repository.

New 🎉: Try out the new 'theme' command. See all available themes <a href="https://github.com/Destaq/cli-homepage/tree/master/docs/themes">in the docs</a>.
New 🎉: New command 'neofetch', for you linux.
--
`;
};
