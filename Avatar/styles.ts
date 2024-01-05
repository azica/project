import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { robotoRegular } from "styles/fonts";
import { background, grey, white, line } from "styles/colors";

export const Wrapper = styled(Box)`
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${white};
	flex-shrink: 0;
	box-shadow: inset 0px 0px 0px 1px ${white};

	&.no-user {
		background: ${background} !important;
		color: ${grey};
		box-shadow: inset 0px 0px 0px 1px ${line};
	}
`;

export const Text = styled(Box)`
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 13px;
`;

export const Image = styled(Box)`
	width: 100%;
	height: 100%;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
