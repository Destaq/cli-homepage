import React from "react";
import { History as LiveInterface } from "../../interfaces/history";

interface LiveProps {
	history: LiveInterface;
}

export const Live: React.FC<LiveProps> = ({ history }) => {
	if (!history) {
		return null;
	} else {
		return (
			<>
				<div>
					<p
						className="whitespace-pre-wrap mb-2"
						style={{ lineHeight: "normal" }}
						dangerouslySetInnerHTML={{ __html: history.output }}
					/>
				</div>
			</>
		);
	}
};

export default Live;
