import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { InputsContainer } from "../styles";

export const CustomInputsContainer = styled(InputsContainer)`
	.MuiCheckbox-root {
		padding: 0;
	}

	.MuiFormControlLabel-root {
		align-items: flex-start;
		margin-right: 0;
		margin-left: 0;
	}
`;
