import { styled } from "@mui/material/styles";
import { Box, Alert } from "@mui/material";
import { robotoMedium, robotoRegular } from "styles/fonts";
import { green, red } from "styles/colors";

export const Conteiner = styled(Alert)`
	padding: 16px;
	gap: 8px;
	background: #ffffff;
	box-shadow: 0px 1px 25px rgba(0, 0, 0, 0.18);
	border-radius: 10px;
	font-family: ${robotoRegular};
	font-size: 14px;
	line-height: 20px;
	width: 400px;

	&.MuiAlert-root {
		align-items: center;
	}

	&.MuiAlert-standardSuccess {
		color: ${green};

		.MuiAlert-icon {
			stroke: ${green};
		}

		.MuiAlert-action .MuiIconButton-root {
			&:hover {
				svg {
					stroke: ${green};
				}
			}
		}
	}

	&.MuiAlert-standardError {
		color: ${red};

		.MuiAlert-icon {
			stroke: ${red};
		}

		.MuiAlert-action .MuiIconButton-root {
			&:hover {
				svg {
					stroke: ${red};
				}
			}
		}
	}

	.MuiAlert-message,
	.MuiAlert-action,
	.MuiAlert-icon {
		padding: 0;
	}

	.MuiAlert-icon {
		width: 24px;
		height: 24px;
		margin: 0;
	}

	.MuiAlert-action {
		transform: translate(3px, -10px);

		.MuiIconButton-root {
			padding: 6px;
			width: 30px;
			height: 30px;

			&:hover {
			}
		}
	}
`;

export const Title = styled(Box)`
	font-family: ${robotoMedium};
	font-size: 15px;
	line-height: 19px;
`;

export const Description = styled(Box)`
	margin-top: 8px;
`;
