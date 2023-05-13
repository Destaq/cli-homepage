import React, { useEffect } from "react";
import { History } from "../interfaces/history";
import * as bin from "./bin";
import { useTheme } from "./themeProvider";

interface ShellContextType {
	history: History[];
	dynamicHistory: History;
	command: string;
	lastCommandIndex: number;
	setHistory: (output: string) => void;
	setCommand: (command: string) => void;
	setDynamicCommand: (command: string) => void;
	setDynamicHistory: (output: string) => void;
	setLastCommandIndex: (index: number) => void;
	execute: (command: string) => Promise<void>;
	executeDynamic: (command: string) => Promise<void>;
	clearHistory: () => void;
	clearDynamicHistory: () => void;
}

const ShellContext = React.createContext<ShellContextType>(null);

interface ShellProviderProps {
	children: React.ReactNode;
}

export const useShell = () => React.useContext(ShellContext);

export const ShellProvider: React.FC<ShellProviderProps> = ({ children }) => {
	const [init, setInit] = React.useState(true);
	const [history, _setHistory] = React.useState<History[]>([]);
	// NOTE: dynamic history and commands are used to temporarily render details *below* the input.
	const [dynamicHistory, _setDynamicHistory] = React.useState<History>(null);
	const [command, _setCommand] = React.useState<string>("");
	const [dynamicCommand, _setDynamicCommand] = React.useState<string>("");
	const [lastCommandIndex, _setLastCommandIndex] = React.useState<number>(0);
	const { setTheme } = useTheme();

	useEffect(() => {
		setCommand("banner");
	}, []);

	useEffect(() => {
		if (!init) {
			execute();
		}
	}, [command, init]);

	useEffect(() => {
		executeDynamic();
	}, [dynamicCommand]);

	const setHistory = (output: string) => {
		_setHistory([
			...history,
			{
				id: history.length,
				date: new Date(),
				command: command.split(" ").slice(1).join(" "),
				output,
			},
		]);
	};

	const setDynamicHistory = (output: string) => {
		_setDynamicHistory({
			id: 1,
			date: new Date(),
			command: dynamicCommand.split(" ").slice(1).join(" "),
			output,
		});
	};

	const setDynamicCommand = (command: string) => {
		// Live updated commands go here.
		if (command.split(" ")[0] === "search") {
			_setDynamicCommand([Date.now(), command].join(" "));
		}
	};

	const setCommand = (command: string) => {
		_setCommand([Date.now(), command].join(" "));

		setInit(false);
	};

	const clearHistory = () => {
		_setHistory([]);
	};

	const clearDynamicHistory = () => {
		_setDynamicHistory(null);
	};

	const setLastCommandIndex = (index: number) => {
		_setLastCommandIndex(index);
	};

	const executeDynamic = async () => {
		const [cmd, ...args] = dynamicCommand.split(" ").slice(1);
		if (cmd === "search" && args.length > 0) {
			const output = await bin["searchSuggestions"](args);
			setDynamicHistory(output);
		}
	};

	const execute = async () => {
		const [cmd, ...args] = command.split(" ").slice(1);

		switch (cmd) {
			case "theme":
				const output = await bin.theme(args, setTheme);

				setHistory(output);

				break;
			case "clear":
				clearHistory();
				break;
			case "":
				setHistory("");
				break;
			default: {
				if (Object.keys(bin).indexOf(cmd) === -1) {
					setHistory(
						`Command not found: ${cmd}. Try 'help' to get started.`,
					);
				} else {
					try {
						const output = await bin[cmd](args);

						setHistory(output);
					} catch (error) {
						setHistory(error.message);
					}
				}
			}
		}
	};

	return (
		<ShellContext.Provider
			value={{
				history,
				dynamicHistory,
				command,
				lastCommandIndex,
				setHistory,
				setCommand,
				setDynamicCommand,
				setDynamicHistory,
				setLastCommandIndex,
				execute,
				executeDynamic,
				clearHistory,
				clearDynamicHistory,
			}}
		>
			{children}
		</ShellContext.Provider>
	);
};
