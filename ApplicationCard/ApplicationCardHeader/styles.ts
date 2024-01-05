import { black, grey } from "styles/colors";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { robotoRegular } from "styles/fonts";

export const Container = styled(Box)`
	display: flex;
	align-items: center;
	gap: 20px;
	width: 100%;
	position: relative;
`;

export const Content = styled(Box)`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	width: 100%;
`;

export const LeftBlock = styled(Box)`
	display: flex;
	align-items: center;
	gap: 10px;
`;
