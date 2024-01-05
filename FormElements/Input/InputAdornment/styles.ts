import styled from "styled-components";
import { IconButton as IconButtonMui } from "@mui/material";
import { grey } from "styles/colors";

export const IconButton = styled(IconButtonMui)`
	width: 34px;
	height: 34px;

	svg {
		stroke: ${grey};
	}
`;
