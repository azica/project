import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { robotoRegular } from "styles/fonts";
import { grey, line } from "styles/colors";

interface ContainerProps {
	lined?: string;
}

export const Content = styled(Box)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 40px;
`;

export const Container = styled(Box)`
	display: flex;
	flex-direction: column;
	position: relative;
	gap: 16px;

	width: 100%;

	${({ lined = "true" }: ContainerProps) => {
		if (lined === "true")
			return `border-top: 1px solid ${line};
					padding-top: 32px;`;
	}}
`;

export const Header = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Text = styled(Box)`
	font-family: ${robotoRegular};
	font-size: 15px;
	line-height: 130%;
	color: ${grey};
`;

export const LeftBlock = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 32px;
`;

export const ButtonContainer = styled(Box)`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 10px;
`;
