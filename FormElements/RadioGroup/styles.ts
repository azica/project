import { styled } from "@mui/material/styles";
import {
	RadioGroup,
	FormControl as FormControlMui,
	FormControlLabel as FormControlLabelMui,
	Radio as RadioMui,
	Box,
} from "@mui/material";
import { white, blue, line, liteGrey, black } from "styles/colors";
import { robotoRegular } from "styles/fonts";

export const RadioGroupMui = styled(RadioGroup)`
	width: 100%;
	gap: 4px;
`;

export const FormControl = styled(FormControlMui)`
	width: 100%;
	position: relative;
	display: flex;
`;

export const RadioMark = styled(Box)`
	width: 8px;
	height: 8px;
	background: ${white};
	border-radius: 50%;
`;

export const RadioContainer = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	background: ${line};
	border: 1px solid ${liteGrey};
	border-radius: 50%;
	transition: all 0.25s ease-in-out;
`;

export const Radio = styled(RadioMui)`
	&.Mui-checked {
		> .MuiBox-root {
			background: ${blue};
			border: 1px solid ${blue};
		}
	}
`;

export const FormControlLabel = styled(FormControlLabelMui)`
	.MuiFormControlLabel-label {
		font-family: ${robotoRegular};
		font-size: 14px;
		line-height: 140%;
		color: ${black};
	}
`;
