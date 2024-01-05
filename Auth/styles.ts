import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { grey } from "styles/colors";
import { robotoRegular } from "styles/fonts";

export const FormContent = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const InputsContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 22px;
	width: 100%;
`;

export const Text = styled(Typography)`
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 140%;
	color: ${grey};
`;
