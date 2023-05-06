import { useMatomo } from "@m4tt72/matomo-tracker-react";
import React, { useEffect, useState } from "react";
import { commandExists } from "../../utils/commandExists";
import { useShell } from "../../utils/shellProvider";
import {
	handleDynamicChoice,
	handleTabCompletion,
} from "../../utils/tabCompletion";
import { useTheme } from "../../utils/themeProvider";
import { Ps1 } from "../ps1";
import { Live } from "../live";
import { search } from "../../utils/bin";

export const Input = ({ inputRef, containerRef }) => {
	const { trackEvent } = useMatomo();
	const { theme } = useTheme();
	const [value, setValue] = useState("");
	const [currentSelection, setCurrentSelection] = useState(0);
	const {
		setCommand,
		setDynamicCommand,
		setDynamicHistory,
		history,
		dynamicHistory,
		lastCommandIndex,
		setLastCommandIndex,
		clearHistory,
		clearDynamicHistory,
	} = useShell();

	useEffect(() => {
		containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
	}, [history, dynamicHistory]);

	useEffect(() => {
		if (value === "") {
			clearDynamicHistory();
		}
	}, [value]);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setDynamicCommand(event.target.value);
		setValue(event.target.value);
	};

	const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		const commands: string[] = history
			.map(({ command }) => command)
			.filter((value: string) => value);

		if (event.key === "c" && event.ctrlKey) {
			event.preventDefault();

			setValue("");
			setDynamicCommand("");
			clearDynamicHistory();
		} else if (event.key === "l" && event.ctrlKey) {
			event.preventDefault();

			clearHistory();
			clearDynamicHistory();
		} else if (event.key === "Tab") {
			event.preventDefault();

			handleTabCompletion(value, setValue);

			if (dynamicHistory !== null) {
				// Cycle through dynamic history list items.
				let out = handleDynamicChoice(
					dynamicHistory.output,
					currentSelection,
					theme,
				);
				setDynamicHistory(out[0]);
				setCurrentSelection(out[1]);
			}
		} else if (event.key === "Enter" || event.code === "13") {
			event.preventDefault();

			if (dynamicHistory !== null) {
				if (value.split(" ")[0] === "search") {
					if (currentSelection !== 0) {
						let choices = dynamicHistory.output.split("\n");
						let re = /(?<=<a.*>)[^<]*(?=<\/a>)/;

						await search(
							choices[currentSelection - 1]
								.match(re)[0]
								.split(" "),
						);
					}
				}
			}

			setLastCommandIndex(0);

			setCommand(value);
			setDynamicCommand("");

			setValue("");
			setCurrentSelection(0);

			trackEvent({
				category: "Command Executed",
				action: value || "no command",
			});
		} else if (event.key === "ArrowUp") {
			event.preventDefault();

			if (!commands.length) {
				return;
			}

			const index: number = lastCommandIndex + 1;

			if (index <= commands.length) {
				setLastCommandIndex(index);
				setValue(commands[commands.length - index]);
			}
		} else if (event.key === "ArrowDown") {
			event.preventDefault();

			if (!commands.length) {
				return;
			}

			const index: number = lastCommandIndex - 1;

			if (index > 0) {
				setLastCommandIndex(index);
				setValue(commands[commands.length - index]);
			} else {
				setLastCommandIndex(0);
				setValue("");
			}
		} else {
			setCurrentSelection(0);
		}
	};

	return (
		<div>
			<div className="flex flex-row space-x-2">
				<label htmlFor="prompt" className="flex-shrink">
					<Ps1 />
				</label>

				<input
					ref={inputRef}
					id="prompt"
					type="text"
					className="focus:outline-none flex-grow"
					aria-label="prompt"
					style={{
						backgroundColor: theme.background,
						color:
							commandExists(value) || value === ""
								? theme.green
								: theme.red,
					}}
					value={value}
					onChange={(event) => handleChange(event)}
					autoFocus
					onKeyDown={onSubmit}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
				/>
			</div>
			<Live history={dynamicHistory} />
		</div>
	);
};

export default Input;
