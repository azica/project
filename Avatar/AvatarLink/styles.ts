import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const Container = styled(Link)`
	position: relative;
	width: 100%;
	height: 100%;
	text-decoration: none;
	display: block;
	transition: all 0.24s ease-in-out;

	&:hover {
		transform: scale(1.1);
	}
`;
