import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { grey, red } from "styles/colors";
import { robotoRegular } from "styles/fonts";

export const Container = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 10px;

	&.small {
		gap: 6px;
	}
`;

export const AlignCenterBlock = styled(Box)`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const Title = styled(Typography)`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	&.list-item-content {
		margin-right: 8px;
		transition: all 0.25s ease-in-out;
	}
`;

export const Finalize = styled(Box)`
	display: flex;
	align-items: center;
	gap: 8px;
	font-family: ${robotoRegular};
	font-size: 12px;
	line-height: 17px;
	color: ${red};
	margin-left: 8px;

	> svg {
		stroke: ${red};
	}
`;

export const Created = styled(Box)`
	color: ${grey};
	font-size: 14px;
	line-height: 20px;
`;
