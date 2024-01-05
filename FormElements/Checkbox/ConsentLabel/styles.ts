import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { black } from "styles/colors";
import { robotoRegular } from "styles/fonts";

interface CheckboxContentProps {
	centered: string;
}

export const CheckboxContent = styled(Box)`
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 140%;
	color: ${black};
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin-left: 8px;

	${({ centered }: CheckboxContentProps) =>
		centered === "true" ? "gap: 3px;" : "margin-top: -3px;"}
`;
