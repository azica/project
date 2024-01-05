import { styled } from "@mui/material/styles";
import { TextField as TextFieldMui } from "@mui/material";
import { rgba } from "styles/mixins";
import { red, grey, white, blue } from "styles/colors";

export const TextField = styled(TextFieldMui)`
	.MuiOutlinedInput {
		/* &:hover {
			fieldset {
				border: 1px solid ${grey} !important;
			}
		}

		&.Mui-focused {
			background: ${white};

			fieldset {
				border: 1px solid ${blue} !important;
				box-shadow: 0px 0px 6px ${rgba(blue, 0.36)};
			}
		}

		&.Mui-error {
			fieldset {
				border: 1px solid ${red} !important;
			}

			&.Mui-focused {
				fieldset {
					box-shadow: 0px 0px 6px ${rgba(red, 0.36)};
				}
			}
		}

		input::placeholder {
			opacity: 1;
			color: ${grey};
		} */
	}
`;
