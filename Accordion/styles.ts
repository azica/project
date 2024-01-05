import { styled } from "@mui/material/styles";
import {
	Accordion,
	AccordionSummary as AccordionSummaryMui,
} from "@mui/material";
import { grey, liteGrey, white, blue, black, background } from "styles/colors";
import { robotoRegular } from "styles/fonts";

export const AccordionMui = styled(Accordion)`
	background: ${background};
	border-radius: 6px;
	box-shadow: none;
	display: flex;
	flex-direction: column-reverse;

	&:before {
		content: none;
	}

	&:last-of-type {
		border-radius: 6px;
	}
`;

export const AccordionSummary = styled(AccordionSummaryMui)`
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 140%;
	color: ${blue};
	min-height: auto;

	&.Mui-expanded {
		min-height: auto;

		.MuiAccordionSummary-content {
			margin: 10px 0;
		}

		svg {
			transform: rotate(270deg);
		}
	}

	svg {
		stroke: ${blue};
		margin-left: 12px;
		transform: rotate(90deg);
		transition: all 0.25s ease-in-out;
	}

	.MuiAccordionSummary-content {
		align-items: center;
		margin: 10px 0;
	}
`;
