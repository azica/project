import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { LinkWrapper as LinkWrapperParent } from "components/Wrappers";
import { liteGrey, white, line } from "styles/colors";
import { robotoRegular } from "styles/fonts";

export const ButtonsContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 24px;
	width: 100%;
	margin-top: 24px;
`;

export const Line = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 140%;
	color: ${liteGrey};
	position: relative;

	&::before {
		content: "";
		display: block;
		width: 100%;
		height: 1px;
		background: ${line};
		position: absolute;
	}

	p {
		position: relative;
		padding: 0 24px;
		background: ${white};
	}
`;

export const LinkWrapper = styled(LinkWrapperParent)`
	display: flex;
	flex-direction: column;
`;
