import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 30px;
	width: 500px;
	position: relative;
`;

export const Empty = styled(Box)`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
