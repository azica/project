import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Link } from "styles/common";
import { blue, grey } from "styles/colors";
import { robotoMedium } from "styles/fonts";

export const LinkRight = styled(Link)`
	margin-left: auto;
	margin-top: 8px;
`;

export const ButtonType = styled(Box)`
	font-family: ${robotoMedium};
	font-size: 14px;
	line-height: 130%;
	color: ${grey};
	cursor: pointer;
	transition: all 0.25s ease-in-out;

	&:hover {
		color: ${blue};
	}
`;
