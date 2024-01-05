import { styled } from "@mui/material/styles";
import { Box, MenuItem as MenuItemMui } from "@mui/material";
import { robotoRegular } from "styles/fonts";
import { rgba } from "styles/mixins";
import { grey, background, black, white, line } from "styles/colors";

export const Placeholder = styled(Box)`
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 140%;
	color: ${grey};
`;

export const MenuItem = styled(MenuItemMui)`
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 140%;
	color: ${grey};
	padding: 8px 16px;
	background-color: ${white};
	white-space: normal;

	&:hover,
	&:focus-visible {
		background-color: ${rgba(background, 0.4)};
	}

	&.Mui-selected {
		background-color: ${background};
		color: ${black};
		pointer-events: none;
	}
`;

export const Text = styled(Box)`
	width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
	display: inline-block;
	white-space: nowrap;
`;

export const ChipList = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

export const ChipItem = styled(Box)`
	display: flex;
	align-items: center;
	padding: 0 4px;
	background: ${background};
	border: 1px solid ${line};
	border-radius: 30px;
	overflow: hidden;

	.MuiChip-root {
		border: none;
	}
`;
