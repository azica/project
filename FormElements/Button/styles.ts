import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import check from "assets/images/check.svg";
import { liteGrey, white, black, blue, grey } from "styles/colors";

interface ButtonProps {
	secondary?: string;
	variant: string;
	inside?: string;
}

export const ButtonCustom = styled(Button)`
	width: 100%;
	${({ variant }: ButtonProps) =>
		variant === "outlined"
			? `
            &.Mui-disabled {
                .MuiButton-startIcon {
                    stroke: ${liteGrey};
                }
            }
        
            .MuiButton-startIcon {
                stroke: ${black};
            }
         `
			: `
            .MuiButton-startIcon {
                stroke: ${white};
            }
            `}

	${({ inside, secondary }: ButtonProps) =>
		inside === "true"
			? {
					padding: `${
						secondary === "true"
							? "11px 42px !important"
							: "16px 42px !important"
					}`,
			  }
			: {
					padding: `${
						secondary === "true"
							? "11px 16px !important"
							: "16px 24px !important"
					}`,
			  }}


	&.vote {
		&::before {
			content: url(${check});
			display: block;
			position: absolute;
			right: 1px;
			top: 1px;
			width: 16px;
			height: 16px;
			opacity: 0;
			transition: all 0.25s ease-in-out;
		}

		&.checked {
			pointer-events: none;
			border: 1px solid ${blue}!important;
			color: ${blue};

			&::before {
				opacity: 1;
			}
		}

		&.disabled {
			pointer-events: none;
			color: ${grey};
		}
	}
`;

export const Content = styled(Box)`
	display: flex;
	align-items: center;
	position: relative;

	.MuiCircularProgress-root {
		position: absolute;
		right: -30px;
	}
`;

export const ButtomWrapper = styled(Box)`
	display: flex;
	align-items: center;
	position: relative;

	.MuiCircularProgress-root {
		margin-left: 16px;
	}
`;
