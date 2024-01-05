import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { LinkWrapper as LinkWrapperParent } from "components/Wrappers";
import { FormContent as FormContentParent } from "../styles";

export const FormContent = styled(FormContentParent)`
	gap: 40px;
`;

export const Title = styled(Typography<"h3">)`
	margin-bottom: 8px;
	text-align: center;
`;

export const ResponseContent = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.MuiButton-root {
		width: 100%;
	}
`;

export const LinkWrapper = styled(LinkWrapperParent)`
	margin-top: 24px;
	width: 100%;
`;

export const ImageWrapper = styled(Box)`
	height: 137px;
	width: 100%;

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
`;
