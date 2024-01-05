import { Fade } from "@mui/material";
import { ButtonPreloaderProps } from "utils/types";
import { CircularProgress } from "./styles";

interface PreloaderProps extends ButtonPreloaderProps {
	variant?: "outlined" | "contained";
	disabled?: boolean;
}

export const ButtonPreloader = ({
	variant,
	disabled,
	outside,
	loading,
}: PreloaderProps) => {
	return (
		<Fade
			in={loading}
			style={{
				transitionDelay: loading ? "250ms" : "0ms",
			}}
			unmountOnExit>
			<CircularProgress
				size={outside ? 25 : 20}
				format={`${variant ? variant : "contained"}`}
				outside={`${outside}`}
				disabled={disabled}
			/>
		</Fade>
	);
};
