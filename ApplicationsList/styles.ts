import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { line } from "styles/colors";

export const List = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;

	.application-item {
		position: relative;
		padding: 0 20px;

		&::before {
			content: "";
			position: absolute;
			z-index: 1;
			display: block;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			box-shadow: 0px 3px 20px transparent;
			border-radius: 10px;
			transition: all 0.25s ease-in-out;
		}

		&.small {
			padding: 0;

			&::before {
				width: calc(100% + 30px);
				transform: translateX(-15px);
			}
		}

		> div {
			position: relative;
			z-index: 2;
		}
	}
`;

export const ItemWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;

	.voting {
		padding-bottom: 20px;
		border-bottom: 1px solid ${line};
	}

	&:last-of-type {
		.voting {
			border: none;
		}
	}
`;
