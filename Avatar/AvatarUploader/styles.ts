import styled from "styled-components";
import { styled as styledMui } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import { robotoRegular } from "styles/fonts";
import { white, background, black } from "styles/colors";
import { rgba } from "styles/mixins";

interface PreloaderProps {
	show: string;
}

export const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	overflow: hidden;
	background: ${background};
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const Uploader = styledMui(IconButton)`
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: ${rgba(black, 0.5)} !important;
	opacity: 0;
	transition: all .25s ease-in-out;

	&:hover{
		opacity: 1;
	}

	> svg {
		stroke: white;
	}
`;

export const Preloader = styledMui(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: ${rgba(black, 0.5)} !important;
	transition: all .25s ease-in-out;
	${({ show }: PreloaderProps) =>
		show === "true"
			? { opacity: 1, visibility: "visible" }
			: { opacity: 0, visibility: "hidden" }}

	.MuiCircularProgress-root {
		color: white;
	}
`;
