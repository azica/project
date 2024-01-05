import { styled as styledMui } from "@mui/material/styles";
import {
	Checkbox,
	Box,
	FormControlLabel as FormControlLabelMui,
} from "@mui/material";
import styled from "styled-components";
import { CheckIcon } from "assets/icons";
import { white, blue, line, black } from "styles/colors";
import { robotoRegular } from "styles/fonts";

export const CheckMark = styled(CheckIcon)`
	stroke: ${white};
`;

export const CheckContainer = styledMui(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
	width: 20px;
	height: 20px;
	background: ${line};
	border-radius: 5px;
`;

export const CheckboxMui = styledMui(Checkbox)`
    &.Mui-checked {
        .MuiBox-root {
            background: ${blue};
        }
    }
`;

export const FormControlLabel = styledMui(FormControlLabelMui)`
    .MuiFormControlLabel-label {
        font-family: ${robotoRegular};
        font-size: 14px;
        line-height: 140%;
        color: ${black};
    }
`;
