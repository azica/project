import { styled } from "@mui/material/styles";
import { CircularProgress as CircularProgressMui } from "@mui/material";
import { liteGrey, white, blue, black } from "styles/colors";

interface CircularProgressProps {
	format: string;
	outside?: string;
	disabled?: boolean;
}

export const CircularProgress = styled(CircularProgressMui)`
	${({ format, outside, disabled }: CircularProgressProps) => {
		let color = white;

		if (outside === "true") {
			color = blue;
		}
		if (format === "outlined") {
			color = black;
		}
		if (disabled && outside === "true") {
			color = liteGrey;
		}

		return `color: ${color};`;
	}}
`;
