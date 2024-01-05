import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Button } from "components/FormElements";
import { FormContent as FormContentParent } from "../styles";
import { rgba } from "styles/mixins";
import { robotoMedium } from "styles/fonts";
import { black, blue, grey, red } from "styles/colors";
import { Text } from "../styles";

interface WarningProps {
	show: string;
}

interface InputProps {
	invalid: string;
}

export const FormContent = styled(FormContentParent)`
	gap: 40px;
`;

export const InputsContainer = styled(Box)`
	position: relative;
	padding-bottom: 16px;
`;

export const InputWrapper = styled(Box)`
	.ReactInputVerificationCode__container {
		width: 100%;
		gap: 18px;
	}

	.ReactInputVerificationCode__item {
		font-family: ${robotoMedium};
		font-size: 24px;
		line-height: 50px;
		text-align: center;
		height: 50px;
		width: 50px;
		background: #f3f6fa;
		border-radius: 8px;
		border: 1px solid
			${({ invalid }: InputProps) =>
				invalid === "true" ? `${red} !important` : "transparent"};
		box-shadow: 0px 0px 6px transparent;
		color: ${({ invalid }: InputProps) =>
				invalid === "true" ? red : black};
		transition: all 0.25s ease-in-out;

		&:hover {
			border: 1px solid ${grey};
		}

		&.is-active {
			background: #ffffff;
			border: 1px solid ${blue};
			box-shadow: 0px 0px 6px
				${({ invalid }: InputProps) =>
					invalid === "true" ? `${rgba(red, 0.36)}` : `${rgba(blue, 0.36)}`};
		}
	}
`;

export const Warning = styled(Box)`
	display: flex;
	align-items: center;
	position: absolute;
	bottom: -14px;
	width: 100%;
	pointer-events: ${({ show }: WarningProps) =>
		show === "true" ? "auto" : "none"};
	opacity: ${({ show }: WarningProps) => (show === "true" ? 1 : 0)};
	transition: all 0.25s ease-in-out;

	p {
		color: ${red};
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: calc(100% - 23px);
	}

	svg {
		stroke: ${red};
		width: 15px;
		height: 15px;
		margin-right: 8px;
	}
`;

export const Timer = styled(Text)`
	font-size: 12px;
	line-height: 140%;
	text-align: center;
`;

export const ResendContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	margin-top: 30px;
`;

export const СhangeableСontent = styled(Box)`
	margin-top: 10px;
	height: 33px;
	display: flex;
	align-items: center;
`;

export const ResendButton = styled(Box)`
	font-size: 12px;
	line-height: 140%;
	text-align: center;
	color: ${blue};
	position: relative;
	cursor: pointer;

	&:hover {
		&::before {
			opacity: 1;
		}
	}
	&::before {
		content: "";
		display: block;
		position: absolute;
		bottom: 1px;
		width: 100%;
		height: 1px;
		background: ${blue};
		opacity: 0;
		transition: all 0.25s ease-in-out;
	}
`;
