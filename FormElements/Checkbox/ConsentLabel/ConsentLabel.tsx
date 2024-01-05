import { Box } from "@mui/material";
import { Link } from "styles/common";
import { CheckboxContent } from "./styles";

interface ConsentLabelProps {
	centered?: boolean;
}

export const ConsentLabel = ({ centered }: ConsentLabelProps) => (
	<CheckboxContent centered={`${centered ? "true" : "false"}`}>
		<Box>Я даю согласие на обработку</Box>
		<Link to='/privacy-policy'>персональных данных</Link>
	</CheckboxContent>
);
